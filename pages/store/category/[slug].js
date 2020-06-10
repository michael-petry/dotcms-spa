import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import { getPage, getNav } from '../../../config/dotcms';
import PageContext from '../../../contexts/PageContext';
import { ProductGrid } from '../../../styles/products/product.styles';
import Product from '../../../components/Product';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CATEGORY_QUERY = gql`
    query CATEGORY_QUERY($query: String!) {
        ProductCollection(query: $query) {
            title
            tags
            retailPrice
            salePrice
            urlTitle
            tags
            image {
                idPath
            }
            host {
                hostName
            }
            category {
                name
                key
            }
        }
    }
`;

const TAGS_QUERY = gql`
    {
        ProductCollection(query: "+categories:snow +Product.tags:*") {
            tags
        }
    }
`;

function category({ category, tags, pageRender, nav }) {
    let query, tagsMap;
    const [tagsList, setTagsList] = useState([]);
    const [selectedTagsList, setSelectedTagsList] = useState([]);
    const router = useRouter();

    const contentType = '+contentType:product';
    tagsMap = tags && tags.map((tag) => `+Product.tags:"${tag}"`);
    query =
        tags.length === 0
            ? `${contentType} +categories:${category}`
            : `${contentType} +categories:${category} ${tagsMap.join(' ')}`;

    const { data, loading, error } = useQuery(CATEGORY_QUERY, {
        variables: {
            query
        },
        fetchPolicy: 'network-only'
    });

    const { data: tagData, loading: l, error: e } = useQuery(TAGS_QUERY);

    const handleTagsChange = (e) => {
        if (e.target.checked) {
            setSelectedTagsList([...selectedTagsList, e.target.value]);
        } else {
            setSelectedTagsList(selectedTagsList.filter((item) => item !== e.target.value));
        }
    };

    const setMainTags = (tagData) => {
        let tagsSet;
        tagsSet = new Set(
            tagData.ProductCollection.reduce((acc, curr) => {
                acc = [...acc, ...curr.tags];
                return acc;
            }, [])
        );
        tagsSet = Array.from(tagsSet).map((tag) => ({
            value: tag,
            checked: false
        }));
        setTagsList(tagsSet);

        for (let tag of tagsSet) {
            if (selectedTagsList.includes(tag.value)) {
                tag.checked = true;
            }
        }
    };

    useEffect(() => {
        const baseUrl = window.location.pathname;

        if (!loading) {
            setMainTags(tagData);
        }
        // if tags in URL then changed selectedTagsList/ i.e. set initialState
        // if tags in URL then set checked

        selectedTagsList.length > 0 &&
            router.push(`${baseUrl}-${selectedTagsList.join('-')}`, undefined, {
                shallow: false
            });
    }, [tagData, selectedTagsList]);

    if (loading) <p>Loading...</p>;
    if (error) <p>Loading...</p>;

    return (
        <>
            {data && (
                <PageContext.Provider
                    value={{
                        nav: nav || []
                    }}
                >
                    <Layout>
                        <div className="container">
                            {data.ProductCollection.length > 0 ? (
                                <>
                                    <h3>Category: {data.ProductCollection[0].category[0].name}</h3>
                                    <h4>Tags: </h4>
                                    <form>
                                        {tagsList.map((tag) => {
                                            return (
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        id={tag.value}
                                                        name={tag.value}
                                                        value={tag.value}
                                                        onChange={handleTagsChange}
                                                    />
                                                    <label htmlFor={tag.value}>{tag.value}</label>
                                                </>
                                            );
                                        })}
                                    </form>
                                    <ProductGrid className="product-grid">
                                        {data.ProductCollection.map((product) => (
                                            <Product product={product} />
                                        ))}
                                    </ProductGrid>
                                </>
                            ) : (
                                <h3>No products found.</h3>
                            )}
                        </div>
                    </Layout>
                </PageContext.Provider>
            )}
        </>
    );
}

export async function getServerSideProps({ req, res, params }) {
    const [category, ...tags] = params.slug.split('-');
    const pageRender = await getPage(`/store/category/${category}/index`);
    const nav = await getNav('4');
    return {
        props: {
            category,
            tags,
            pageRender,
            nav
        }
    };
}

export default withApollo(category);

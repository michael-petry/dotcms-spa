import PropTypes from 'prop-types';

const { arrayOf, shape, string, number } = PropTypes;

export const commentItemType = {
    body: string.isRequired,
    commentAuthor: shape({
        firstName: string.isRequired,
        lastName: string.isRequired,
        profilePhoto: string.isRequired
    }).isRequired,
    identifier: string.isRequired,
    postDate: string.isRequired
};

export const commentListType = arrayOf(shape(commentItemType));

export const blogDetailType = {
    author: arrayOf(
        shape({
            firstName: string.isRequired,
            lastName: string.isRequired
        })
    ),
    blogComment: commentListType,
    body: string.isRequired,
    identifier: string.isRequired,
    image: string.isRequired,
    postingDate: number.isRequired,
    tags: string.isRequired,
    title: string.isRequired,
    urlTitle: string.isRequired
};

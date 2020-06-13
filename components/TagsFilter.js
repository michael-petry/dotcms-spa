import React, { useState } from 'react';
import styled from 'styled-components';
import { capitalize } from '../utilities/shared';

const TagsListContainer = styled.div`
    display: flex;
`;

const Tags = styled.div`
    input[type='checkbox'] {
        vertical-align: middle;
    }

    border: 1px solid #d5d5d5;
    border-radius: 3px;
    padding: 0.5rem;
    margin-right: 1rem;
`;

function TagsFilter({ onFilterChange, list, selected }) {
    const [currentTags, setCurrentTags] = useState(selected || []);

    const handleCheckbox = (e) => {
        const { value } = e.target;
        let result;
        if (e.target.checked) {
            result = [...currentTags, value]
        } else {
            result = currentTags.filter((item) => item !== value);
        }
        setCurrentTags(result);
        onFilterChange(result);
    };

    return (
        <TagsListContainer>
            {list?.map(({ key, doc_count }) => {
                const checked = currentTags.includes(key);
                return (
                    <Tags>
                        <input
                            type="checkbox"
                            name={key}
                            id={key}
                            value={key}
                            checked={checked}
                            onChange={handleCheckbox}
                        />
                        <label htmlFor={key}>
                            {capitalize(key)} ({doc_count})
                        </label>
                    </Tags>
                );
            })}
        </TagsListContainer>
    );
}

export default TagsFilter;
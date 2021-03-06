import { blogDetailType } from '../types';

const CommentForm = ({ identifier, title, urlTitle }) => {
    return (
        <div className="row mt-5 pt-5">
            <div className="col-lg-12">
                <h2 className="mb-2">Leave a Comment</h2>

                <form>
                    <input type="hidden" name="blogTitle" value={title} />
                    <input type="hidden" name="blogId" value={identifier} />
                    <input type="hidden" name="today" value="$today" />
                    <input
                        type="hidden"
                        name="returnUrl"
                        value={`/blog/post/${urlTitle}#comments`}
                    />
                    <div className="form-wrap">
                        <label className="form-label rd-input-label sr-only">Message</label>
                        <textarea
                            className="form-input form-control-has-validation form-control-last-child"
                            name="commentBody"
                            placeholder="Type a comment about this blog. Your feedback is appreciated"
                        ></textarea>
                    </div>
                    <input type="submit" className="button button-primary" value="Submit" />
                </form>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    identifier: blogDetailType.identifier,
    title: blogDetailType.title,
    urlTitle: blogDetailType.urlTitle
};

export default CommentForm;

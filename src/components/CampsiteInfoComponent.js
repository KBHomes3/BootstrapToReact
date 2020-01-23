import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, Label, Card, CardImg, CardText, CardBody, 
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}<br />
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm campsiteId={campsiteId} postComment={postComment}/>
            </div>
        );
    }
    return <div />;
}


function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} postComment={props.postComment} campsiteId={props.campsite.id}/>
                </div>
            </div>
        );
    }
    return <div />;
}


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
    }
    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    handleSubmit(values) {
        this.toggle();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render(){
        return (
            <React.Fragment>
                <Button outline onClick={this.toggle}>Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" sm={4}>Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                        </Row>
                        <Row className="form-group">
                        <Label htmlFor="author" md={4}>Your Name</Label>
                            <Col md={{size: 12}}>
                                <Control.text model=".author"
                                    id="author"
                                    name="author"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                                
                            </Col>
                        </Row>
                        <Row className="form-group" md={12}>
                        <Label htmlFor="text" md={4}>Comment</Label>
                            <Col md={{size: 12}}>
                                <Control.textarea 
                                rows="6"
                                model=".text"
                                id="text"
                                name="text"
                                className="form-control"
                                />
                                
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 12}}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
export default CampsiteInfo;
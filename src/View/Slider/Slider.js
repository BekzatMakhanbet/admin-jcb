import React, { Component } from 'react';
import Axios from 'axios';
import { Drawer, Form, Button, Col, Row, Input,Popconfirm, Select,Upload, message, DatePicker, Icon ,Divider,Table} from 'antd';

const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";

export class Slider extends Component {
    state={
        id:"",
        slider_list:[],
        link:[],
        file:"",
        title:'',
        text:'',
        visible:false,
        visibleUpdate:false,
        title_update:"",
        text_update:"",
        link_update:"",
        background_update:"",
        changed:false
    }

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };

    onCloseUpdate = () => {
        this.setState({
        visibleUpdate: false,
        });
    };

    refresh=()=>{
        Axios.get(url+"slider").then(res=>{this.setState({slider_list:res.data})});
    };

    handleSubmit=()=>{
        var {link,file,title,text}=this.state;
        console.log(file[0]);
        var data=new FormData();
        data.append('file',file[0]);
        data.append('link',link);
        data.append('title',title);
        data.append('text',text);
        Axios.post(url+"slider",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно добавлено');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    };
    handleUpdate=()=>{
        var {title_update,text_update,link_update,file,changed,id}=this.state;
        console.log(file[0]);
        var data=new FormData();
        if (changed) {
            data.append('file',file[0]);
        }
        data.append('link',link_update);
        data.append('title',title_update);
        data.append('text',text_update);
        data.append('id',id)
        Axios.post(url+"slider/update",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно сделано');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    };


    componentWillMount(){
        this.refresh();
    }
    
    render() {
        const columns=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Жирный заголовок",
                dataIndex:"title",
                key:"title",
            }, {
                title:"Маленький заголовок",
                dataIndex:"text",
                key:"text",
            },{
                title:"Путь куда ведёт кнопка Узнать больше",
                dataIndex:"link",
                key:"link",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open(record.link)}}>{text}</a> 
                    </span>
                  ),
            },
            {
                title:"Фото",
                dataIndex:"background",
                key:"background",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open(url+record.background)}}>{text}</a> 
                    </span>
                  ),
            },
            
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a onClick={()=>{this.setState({visibleUpdate:true,title_update:record.title,text_update:record.text,link_update:record.link,background_update:record.background,id:record.id})}}>Изменить</a>
                    <Divider type="vertical" />
                    <Popconfirm
                            title="Вы уверены что хотите удалить?"
                            onConfirm={()=>{Axios.post(url+"slider/delete",{info:record}).then(res=>{this.refresh()})}}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <a>Удалить</a>
                    </Popconfirm>
                  </span>
                ),
              }
        ]
        return (
            <div style={{maxWidth:"90%",width:"90%",marginLeft:"80px",marginTop:"40px"}}>
                 <h1 style={{textAlign:'center'}}>Слайдеры</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Добавить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.slider_list}/>
                <Drawer
                    title="Добавить новый слайдер"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Жирный заголовок">
                                    <Input placeholder="" onChange={(e)=>{this.setState({title:e.target.value})}} type="text"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Маленький заголовок">
                                    <Input placeholder="" onChange={(e)=>{this.setState({text:e.target.value})}} type="text"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Путь куда ведёт кнопка <<Узнать Больше>>">
                                <Input placeholder="url(Просто скопируйте путь как http://example.com/main)" onChange={(e)=>{this.setState({link:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Фотография">
                                <input type="file" onChange={(e)=>{this.setState({file:e.target.files})}}/>
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                        Создать
                        </Button>
                    </div>
                </Drawer>
                <Drawer
                    title="Изменить слайдер"
                    width={720}
                    onClose={this.onCloseUpdate}
                    visible={this.state.visibleUpdate}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Жирный заголовок">
                                <Input value={this.state.title_update} placeholder="" onChange={(e)=>{this.setState({title_update:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Маленький заголовок">
                                <Input value={this.state.text_update} placeholder="" onChange={(e)=>{this.setState({text_update:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Обновить путь куда ведёт кнопка <<Узнать Больше>>">
                                <Input value={this.state.link_update} placeholder="url(Просто скопируйте путь как http://example.com/main)" onChange={(e)=>{this.setState({link_update:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Название старой фотографии">
                                <p><span>{this.state.background_update}</span></p>
                                <img style={{width:300}} src={url+this.state.background_update} alt=""/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Выбрать новую фотографию">
                                <input type="file" onChange={(e)=>{this.setState({file:e.target.files,changed:true})}}/>
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleUpdate} type="primary">
                         Изменить
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Slider;

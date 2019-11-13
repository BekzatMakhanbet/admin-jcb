import React, { Component } from 'react';
import axios from 'axios';
import { Table, Divider, Tag, Spin } from 'antd';
import { Drawer, Form, Button, Col, Row, Input, Select,Upload, message, DatePicker, Icon,Popconfirm } from 'antd';
import { log } from 'util';
import Axios from 'axios';

const { Option } = Select;



const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";


export class AboutUs extends Component {
    state = { 
        visible: false,
        offer_list:[],
        title:"",
        text:"",
        visibleUpdate:false,
        file:"",
        id:"",
        new_text:'',
        title_update:"",
        text_update:"",
        file_update:"",
        file_list:[],
        filePhoto:"",
        info:[],
        modal_show_photo:false,
        loading:false,
    };

    showDrawer = () => {
        const {info}=this.state;
        this.setState({visible:true,new_text:info[0].text})
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
        axios.get(url+'aboutus_text').then(res=>{this.setState({info:res.data})});
        axios.get(url+'aboutus_background').then(res=>{this.setState({file_list:res.data});});
    }

    handleSubmit=()=>{
        Axios.post(url+"aboutus_text",{text:this.state.new_text}).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно обновлено');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    }

    componentWillMount(){
        this.refresh();
    }

    onClosePhoto=()=>{
        this.setState({modal_show_photo:false});
    }
    showDrawerPhoto=()=>{
        this.setState({modal_show_photo:true});
    }
    handleSubmitPhoto=()=>{
        var {filePhoto}=this.state;
        this.setState({loading:true})
        console.log(filePhoto[0]);
        var data=new FormData();
        data.append('file',filePhoto[0]);
        Axios.post(url+"aboutus_background",data).then(res=>{
            console.log(res);
            this.refresh();
            this.setState({loading:false})
            message.success('Успешно добавлено');
            this.setState({modal_show_photo:false});
        }).catch(err=>{        this.setState({loading:false});
        console.log(err);message.error('Произошла ошибка!')});
    }
    handleUpdate=()=>{
        var {title_update,text_update,file_update,id}=this.state;
        var data=new FormData();
        if (file_update[0]) {
            data.append('file',file_update[0]);
        }
        data.append('text',text_update);
        data.append('title',title_update);
        data.append('id',id)
        Axios.post(url+"special_offers/update",data).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно сделано');
            this.setState({visible:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    };
    
    render() {
          const columns=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Текст",
                dataIndex:"text",
                key:"text",
            }
            
        ]
        const columnsPhoto=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Название",
                dataIndex:"filename",
                key:"filename",
                render: (text, record) => (
                    <span>
                        <a onClick={()=>{window.open(url+record.filename)}}>{text}</a> 
                    </span>
                  ),
            }, 
        ]

        return (<>
            <div style={{maxWidth:"70%",width:"70%",marginLeft:"240px",marginTop:"40px"}}>
                <Spin spinning={this.state.loading}>

                <h1 style={{textAlign:'center'}}>Баннер</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawerPhoto} type="primary" >Изменить Фото</Button>
                </Button.Group>
                <Table bordered columns={columnsPhoto} dataSource={this.state.file_list}/>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onClosePhoto}
                    visible={this.state.modal_show_photo}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Фотография">
                                <input type="file" onChange={(e)=>{this.setState({filePhoto:e.target.files})}}/>
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
                        <Button onClick={this.onClosePhoto} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmitPhoto} type="primary">
                        Добавить
                        </Button>
                    </div>
                </Drawer>
                </Spin>
            </div>
            <div style={{maxWidth:"70%",width:"70%",marginLeft:"250px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Текст</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Поменять текст</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.info}/>
                <Drawer
                    title="Поменять данные"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Текст">
                                <Input.TextArea autosize={{minRows:10}} placeholder="Введите текст" value={this.state.new_text} onChange={(e)=>{this.setState({new_text:e.target.value})}} type="text"/>
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
                        Поменять
                        </Button>
                    </div>
                </Drawer>
            </div>
            </>
        )
    }
}

export default AboutUs;

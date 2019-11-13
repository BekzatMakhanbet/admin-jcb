import React, { Component } from 'react'
import Axios from 'axios';
import {Popconfirm,Table,Button,Drawer,Col,Row,Form,Input,message} from 'antd';


const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";


export class LiveLink extends Component {
    state={
        modal_show:false,
        modal_show_youtube:false,
        info:'',
        new_text:'',
        new_title:'',
        new_link:'',
        link_youtube:'',
        new_link_youtube:''
    }
    refresh=()=>{
        Axios.get(url+'live_link').then(res=>{this.setState({info:res.data});});
        Axios.get(url+'youtube_link').then(res=>{this.setState({link_youtube:res.data});});
        console.log(this.state.info);
    }
    componentWillMount(){
        this.refresh();
    }
    onClose=()=>{
        this.setState({modal_show:false});
    }
    showDrawer=()=>{
        const {info}=this.state;
        this.setState({modal_show:true,new_text:info[0].text,new_title:info[0].title,new_link:info[0].link})
    }
    handleSubmit=()=>{
        Axios.post(url+"live_link",{title:this.state.new_title,text:this.state.new_text,link:this.state.new_link}).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно обновлено');
            this.setState({modal_show:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    }
    onCloseYoutube=()=>{
        this.setState({modal_show_youtube:false});
    }
    showDrawerYoutube=()=>{
        this.setState({modal_show_youtube:true})
    }
    handleSubmitYoutube=()=>{
        Axios.post(url+"youtube_link",{link:this.state.new_link_youtube}).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно обновлено');
            this.setState({modal_show_youtube:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    }
    render() {
        var arr=[{file_id:1,path:''}]
        const columns2=[
            {
                title:"Id",
                dataIndex:"file_id",
                key:"file_id"
            },
            {
                title:"Ссылка на видео",
                dataIndex:"path",
                key:"path",
                render:(text)=>(
                    <span>{this.state.link_youtube}</span>
                )
            }
        ]
        const columns=[
            {
                title:"Id",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Заголовок",
                dataIndex:"title",
                key:"title"
            },
            {
                title:"Текст",
                dataIndex:"text",
                key:"text"
            },
            {
                title:"Ссылка на страницу",
                dataIndex:"link",
                key:"link"
            }
        ]
        return (
            <>
             <div style={{maxWidth:"80%",width:"80%",marginLeft:"200px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Youtube</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawerYoutube} type="primary" >Поменять ссылку</Button>
                </Button.Group>
                <Table bordered columns={columns2} dataSource={arr}/>
                <Drawer
                    title="Поменять ссылку"
                    width={720}
                    onClose={this.onCloseYoutube}
                    visible={this.state.modal_show_youtube}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Ссылка на youtube видео (Откройте видео через компьютер, нажмите правую кнопу мышки и Скопировать HTML-код. Найдите ссылку в коде и вставтье её сюда.)">
                                <Input placeholder="Пример ссылки: https://www.youtube.com/embed/H5d1Y6CN8eU" onChange={(e)=>{this.setState({new_link_youtube:e.target.value})}} type="text"/>
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
                        <Button onClick={this.onCloseYoutube} style={{ marginRight: 8 }}>
                        Отменить
                        </Button>
                        <Button onClick={this.handleSubmitYoutube} type="primary">
                        Поменять
                        </Button>
                    </div>
                </Drawer>
            </div>
            <div style={{maxWidth:"80%",width:"80%",marginLeft:"200px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>LiveLink</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Поменять ссылку</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.info}/>
                <Drawer
                    title="Поменять данные"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.modal_show}
                    >
                    <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Заголовок">
                                <Input placeholder="Введите заголовок" value={this.state.new_title}  onChange={(e)=>{this.setState({new_title:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Текст">
                                <Input placeholder="Введите текст" value={this.state.new_text} onChange={(e)=>{this.setState({new_text:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Ссылка куда перейдет">
                                <Input placeholder="Пример ссылки: https://www.youtube.com/H5d1Y6CN8eU" value={this.state.new_link}  onChange={(e)=>{this.setState({new_link:e.target.value})}} type="text"/>
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

export default LiveLink;

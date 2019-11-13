import React, { Component } from 'react'
import Axios from 'axios';
import {Popconfirm,Table,Button,Drawer,Col,Row,Form,Input,message} from 'antd';


const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";


export class Youtube extends Component {
    state={
        modal_show:false,
        link:'',
        new_link:''
    }
    refresh=()=>{
        Axios.get(url+'youtube_link').then(res=>{this.setState({link:res.data});});
    }
    componentWillMount(){
        this.refresh();
    }
    onClose=()=>{
        this.setState({modal_show:false});
    }
    showDrawer=()=>{
        this.setState({modal_show:true})
    }
    handleSubmit=()=>{
        Axios.post(url+"youtube_link",{link:this.state.new_link}).then(res=>{
            console.log(res);
            this.refresh();
            message.success('Успешно обновлено');
            this.setState({modal_show:false});
        }).catch(err=>{console.log(err);message.error('Произошла ошибка!')});
    }
    render() {
        var arr=[{file_id:1,path:''}]
        const columns=[
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
                    <span>{this.state.link}</span>
                )
            }
        ]
        return (
            <div style={{maxWidth:"90%",width:"90%",marginLeft:"80px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Youtube</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                    <Button onClick={this.showDrawer} type="primary" >Поменять ссылку</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={arr}/>
                <Drawer
                    title="Поменять ссылку"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.modal_show}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Ссылка на youtube видео (Откройте видео через компьютер, нажмите правую кнопу мышки и Скопировать HTML-код. Найдите ссылку в коде и вставтье её сюда.)">
                                <Input placeholder="Пример ссылки: https://www.youtube.com/embed/H5d1Y6CN8eU" onChange={(e)=>{this.setState({new_link:e.target.value})}} type="text"/>
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
        )
    }
}

export default Youtube;

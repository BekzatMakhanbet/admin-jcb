import React, { Component } from 'react'
import Axios from 'axios';
import {Popconfirm,Table,Button,Drawer,Col,Row,Form,Input,message, Select, Spin} from 'antd';

const {Option}=Select;


const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";

export class Contacts extends Component {
    state={
        file_list:[],
        modal_show:false,
        file:"",
        title_of_file:"",
        cat_id:'1',
        car_id:'',
        loading:false,
        update_id:'',
        update_type:'',
        update_value:'',
        x_coord:'',
        y_coord:'',

    }
    refresh=()=>{
        Axios.get(url+'contacts').then(res=>{this.setState({file_list:res.data});});
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
    handleChangeCat=(value)=>{
        console.log(`selected ${value}`);
        this.setState({cat_id:value});
    }
    handleChangeCar=(value)=>{
        console.log(`selected ${value}`);
        this.setState({car_id:value});
    }
    handleSubmit=()=>{
        var {update_id,update_type,update_value}=this.state;
        this.setState({loading:true})
        Axios.post(url+"contacts/"+update_id,{update_value:update_value}).then(res=>{
            console.log(res);
            this.refresh();
            this.setState({loading:false})
            message.success('Успешно добавлено');
            this.setState({modal_show:false});
        }).catch(err=>{        this.setState({loading:false});
        console.log(err);message.error('Произошла ошибка!')});
    }
    render() {
        const columns=[
            {
                title:"ID ",
                dataIndex:"id",
                key:"id"
            },
            {
                title:"Тип",
                dataIndex:"type",
                key:"type",
            }, 
            {
                title:"Значение",
                dataIndex:"value",
                key:"value",
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                        <a onClick={()=>{this.setState({modal_show:true,update_id:record.id,update_type:record.type,update_value:record.value})}}>Изменить</a>
                  </span>
                ),
              }
        ]
        return (
            <Spin spinning={this.state.loading}>
            <div style={{maxWidth:"90%",width:"90%",marginLeft:"80px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Контакты</h1>
                <Button.Group style={{marginBottom:"20px"}}>
                    <Button onClick={this.refresh} type="primary" >Обновить</Button>
                </Button.Group>
                <Table bordered columns={columns} dataSource={this.state.file_list} pagination={false}/>
                <Drawer
                    title="Добавить новый файл"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.modal_show}
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Название">
                                <Input placeholder="" value={this.state.update_type} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Адрес">
                                <Input placeholder="" value={this.state.update_value} onChange={(e)=>{this.setState({update_value:e.target.value})}} type="text"/>
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
                        Добавить
                        </Button>
                    </div>
                </Drawer>
            </div>
            </Spin>
        )
    }
}

export default Contacts;

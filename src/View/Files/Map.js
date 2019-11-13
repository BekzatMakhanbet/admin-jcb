import React, { Component } from 'react'
import Axios from 'axios';
import {Popconfirm,Table,Button,Drawer,Col,Row,Form,Input,message, Select, Spin} from 'antd';

const {Option}=Select;


const url="http://89.219.32.105:5005/";
// const url="http://localhost:5000/";

export class MapCont extends Component {
    state={
        file_list:[],
        modal_show:false,
        file:"",
        title_of_file:"",
        cat_id:'1',
        car_id:'',
        loading:false,
        city_id:'',
        city_name:'',
        address:'',
        x_coord:'',
        y_coord:'',

    }
    refresh=()=>{
        Axios.get(url+'map').then(res=>{this.setState({file_list:res.data});});
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
        var {city_id,city_name,x_coord,y_coord,address}=this.state;
        this.setState({loading:true})
        Axios.post(url+"map/"+city_id,{city_name:city_name,address:address,x_coord:x_coord,y_coord:y_coord}).then(res=>{
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
                title:"Код города ",
                dataIndex:"city_id",
                key:"city_id"
            },
            {
                title:"Название",
                dataIndex:"city_name",
                key:"city_name",
            }, 
            {
                title:"Адрес",
                dataIndex:"address",
                key:"address",
            },{
                title:"Х координата",
                dataIndex:"x_coord",
                key:"x_coord",
                
            },
            {
                title:"Y координата",
                dataIndex:"y_coord",
                key:"y_coord",
                
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                  <span>
                        <a onClick={()=>{this.setState({modal_show:true,city_name:record.city_name,address:record.address,x_coord:record.x_coord,y_coord:record.y_coord,city_id:record.city_id})}}>Изменить</a>
                  </span>
                ),
              }
        ]
        return (
            <Spin spinning={this.state.loading}>
            <div style={{maxWidth:"90%",width:"90%",marginLeft:"80px",marginTop:"40px"}}>
                <h1 style={{textAlign:'center'}}>Файлы</h1>
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
                                <Input placeholder="" value={this.state.city_name} onChange={(e)=>{this.setState({city_name:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Адрес">
                                <Input placeholder="" value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Х координата  (Цифры через точку, запятую не использовать)">
                                <Input placeholder="" value={this.state.x_coord} onChange={(e)=>{this.setState({x_coord:e.target.value})}} type="text"/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Y координата (Цифры через точку, запятую не использовать)">
                                <Input placeholder="" value={this.state.y_coord} onChange={(e)=>{this.setState({y_coord:e.target.value})}} type="text"/>
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

export default MapCont;

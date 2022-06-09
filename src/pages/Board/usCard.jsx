import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Badge } from 'antd';
import { BulbTwoTone, BugTwoTone, PushpinTwoTone, CarryOutTwoTone, UserOutlined, EditOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';


function USCard(props) {

    const openCard = () => {
        // console.log(props.data.index);
        props.handle(props.data.index);
    };

    const getData = (fieldsType) => {
        var cardIcon;
        var cardType;
        var cardRibbon;
        if (props.data.type === "story") {
            cardIcon = (<CarryOutTwoTone />);
            cardType = "Story";
            cardRibbon = "blue";
        } else if (props.data.type === "spike") {
            cardIcon = (<PushpinTwoTone />);
            cardType = "Spike";
            cardRibbon = "pink";
        } else if (props.data.type === "bug") {
            cardIcon = (<BugTwoTone />);
            cardType = "Bug";
            cardRibbon = "red";
        } else if (props.data.type === "task") {
            cardIcon = (<BulbTwoTone />);
            cardType = "Task";
            cardRibbon = "lime";
        }
        if (fieldsType === "icon") {
            return cardIcon;
        } else if (fieldsType === "type") {
            return cardType;
        } else if (fieldsType === "ribbon") {
            return cardRibbon;
        }
    }

    const getAssigned = () => {
        var assigned;
        var col = props.column;
        if (col === "Testing" || col === "Closed") {
            if ("qa" in props.data) {
                assigned = props.data.qa;
            } else {
                assigned = "Unassigned";
            }
            
        } else {
            if ("dev" in props.data) {
                assigned = props.data.dev;
            } else {
                assigned = "Unassigned";
            }
        }
        return assigned;
    }
    
    return (<>
        <Badge.Ribbon text={getData("type")} color={getData("ribbon")} >
            <ProCard
                bordered
                hoverable
                type="inner"
                // actions={[
                //     <EditOutlined key="edit" />,
                // ]}
                onClick={openCard}
            >
                <Row>
                    <Col span={6}>{getData("icon")}</Col>
                    <Col span={8}>{props.data.index}</Col>
                </Row>
                <Row>
                <Col span={24}>{props.data.title}</Col> 
                </Row>
                <br />
                <Row>
                    <Col span={6}><Avatar icon={<UserOutlined />} /></Col>
                    <Col span={16}>{getAssigned()}</Col>
                    <Col span={2}>{props.data.point}</Col>
                </Row>
            </ProCard>
        </Badge.Ribbon>
    </>);
};

export default USCard;
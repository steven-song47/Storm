import React, { Component } from 'react';
import { WechatOutlined, DoubleLeftOutlined, DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Steps, Drawer, Tag, Select, Row, Col, Divider, Descriptions, Input, Button, Timeline, Modal, Alert, Table, message } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { openCard, selectMembers, sendNotificationByWechat, switchStep, displayLog, updateCard, searchCases } from '@/services/ant-design-pro/api';
import EditableTable from './editableTable';
import CardTable from './cardTable';
import CaseTable from './caseTable';
import AddCaseModal from './addCaseModal';
import ImportCaseModal from './importCaseModel';
import ImportCardModal from './importCardModel';

const { Step } = Steps;
const { TextArea } = Input;

const stepList = ["Grooming", "Kick Off", "In Dev", "Desk Check", "In QA", "Test Done"];
const stateList = ["grooming", "kick off", "in dev", "desk check", "in qa", "test done"];

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

class ActionDrawer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visibleDrawer: false,
            openCardData: {},
            currentState: "",
            cardDev: "",
            cardQA: "",
            cardAC: "",
            sendMembers: [],
            membersOptions: [],
            showLog: false,
            logData: "",
            tmpCase: [],
            tmpBug: [],
            tmpRisk: [],
            tmpTask: [],
            saveButton: false,
            backButton: false,
            nextButton: false,
            isModalVisible: false,
            currentCases: [],
            importCases: [],
            // addCaseModal传递case数据
            addCases: [],
            // 用于刷新case table数据
            updateCaseTime: "",
            checkboxTable: 0,
            changeCaseTableKey: 0,
            currentAssociation: [],
            updateCardTime: "",
        };
    }

    componetDidMount() {
    }

    componentWillUnmount() {
    }

    addCaseRef = React.createRef();
    importCaseRef = React.createRef();
    importCardRef = React.createRef();

    showActionDrawer = async (cardIndex) => {
        const msg = await openCard({index: cardIndex})
        await this.setState({
            visibleDrawer: true,
            openCardData: msg.data,
            cardDev: msg.data.dev,
            cardQA: msg.data.qa,
            cardAC: msg.data.ac,
            currentState: msg.data.state,
            saveButton: false,
            currentCases: msg.data.case,
            currentAssociation: msg.data.card,
        });
        // 【遗留问题】关于设置currentCases: msg.data.case的实际数据 != this.state.openCardData.case的数据，这是为什么呢？
        // await this.setState({
        //     currentCases: this.state.openCardData.case,
        // })
    }

    closeActionDrawer = () => {
        this.setState({
            visibleDrawer: false,
        });
        this.props.refresh();
        this.clearEditableTable();
    }

    // 用来清空可编辑表格的数据缓存
    clearEditableTable = () => {
        this.setState({
            openCardData: {
                "state": stateList[0],
                "index": 0
            },
            currentCases: [],
        });
    }

    switchStepButton = async (operate) => {
        await waitTime(1000);
        const state = this.state.currentState;
        const index = this.state.openCardData.index;     
        const state_index = stateList.indexOf(state);
        if (operate === "next") {
            if (state != stateList[stateList.length - 1]) {
                await this.setState({
                    currentState: stateList[state_index + 1],
                });
            }
        } else if (operate === "back") {
            if (state != stateList[0]) {
                await this.setState({
                    currentState: stateList[state_index - 1],
                });
            }
        }
        await switchStep({
            index: index,
            current_state: state,
            operate: operate,
        });
    }

    currentStep = (state) => {
        var index = 0;
        if (state != "test done") {
            index = stateList.indexOf(state);
        } else {
            index = 5;
        }
        return index;
    }

    stepTagStatus = (state) => {
        if (state == "test done") {
            return "finish";
        } else {
            return "process"
        }
    }

    showButton = (state) => {
        if (state == "test done") {
            return true;
        } else {
            return false;
        }
    }

    disabledStepButton = (operate) => {
        var state = this.state.currentState;
        if (operate === "back") {
            if (state === stateList[0]) {
                return true;
            } else {
                return false;
            }
        } else if (operate === "next") {
            if (state === stateList[stateList.length - 1]) {
                return true;
            } else {
                return false;
            }
        }
    }

    updateCardRisk = async (data) => {
        this.setState({
            tmpRisk: data,
        });
    }

    updateCardBug = async (data) => {
        this.setState({
            tmpBug: data,
        });
    }

    updateCardTask = async (data) => {
        this.setState({
            tmpTask: data,
        });
    }

    getSelectMember = async (value) => {
        const msg = await selectMembers({role: value});
        await this.setState({
            membersOptions: msg.data,
        })
    }

    switchDevMember = (member) => {
        this.setState({
            cardDev: member,
        });
    }

    switchQAMember = (member) => {
        this.setState({
            cardQA: member,
        });
    }

    updateAC = (e) => {
        var value = e.target.value;
        this.setState({
            cardAC: value,
        });
    }

    switchSendMembers = (members) => {
        this.setState({
            sendMembers: members,
        });
    }

    saveCard = async () => {
        await this.setState({
            saveButton: true,
        });
        console.log(this.state.openCardData.index);
        await updateCard({
            index: this.state.openCardData.index,
            dev: this.state.cardDev,
            qa: this.state.cardQA,
            ac: this.state.cardAC,
            // case: this.state.tmpCase,
            case: this.state.currentCases,
            risk: this.state.tmpRisk,
            task: this.state.tmpTask,
            card: this.state.currentAssociation,
        })
    }

    sendNotification = async () => {
        await sendNotificationByWechat({members: this.state.sendMembers, state: this.state.currentState});
        message.success("Send message successfully");
    } 

    showCardTitle = () => {
        return this.state.openCardData.index + " - " + this.state.openCardData.title
    }

    switchLog = async () => {
        await this.setState({
            showLog: !this.state.showLog
        });
        if (this.state.showLog) {
            const msg = await displayLog({index: this.state.openCardData.index})
            await this.setState({
                logData: msg.data,
            });
        }
    }

    // 用于子组件case table中数据更新后（import、add、edit），更新currentCases的数据
    updateCaseData = (data) => {
        this.setState({
            currentCases: data,
        });
    }

    // 调用子组件中的方法打开add case的modal
    openAddCaseModal = () => {
        this.addCaseRef.current.showAddModal();
    }

    // 用在子组件（import、add）中更新case table的数据
    // 注：数组的push方法可以直接改变currentCases的state
    updateCaseTable = (cases) => {
        var current_cases = this.state.currentCases;
        for (let i=0; i<cases.length; i++) {
            current_cases.push({
               "id": cases[i]["id"]? cases[i]["id"]: (Math.random() * 1000000000).toFixed(0),
               "name": cases[i]["name"],
               "module": cases[i]["module"],
               "level": cases[i]["level"],
               "tag": cases[i]["tag"]? cases[i]["tag"]: "",
               "auto": cases[i]["auto"]? cases[i]["auto"]: "N",
               "given": cases[i]["given"],
               "when": cases[i]["when"],
               "then": cases[i]["then"],
               "effect": cases[i]["effect"]? cases[i]["effect"]: "active",
               "review": cases[i]["review"]? cases[i]["review"]: "created",
               "result": cases[i]["result"]? cases[i]["result"]: "Created",
               "creator": cases[i]["creator"]? cases[i]["creator"]: "",
               "card": cases[i]["card"],
            });
        }
        this.setState({
            updateCaseTime: Date.now(),
        })
    }

    // 调用子组件中的方法打开import case的modal
    openImportCaseModal = () => {
        this.importCaseRef.current.showImportModal();
    }

    // 调用子组件中的方法打开import card的modal
    openImportCardModal = () => {
        this.importCardRef.current.showImportModal();
    }

    // 用在子组件（add）中更新card table的数据
    updateCardTable = (cards) => {
        // console.log("outside modal:", cards)
        this.setState({
            currentAssociation: cards,
            updateCardTime: Date.now(),
        })
    }

    render() {

        const showHealthTag = () => {
            var bug = this.state.openCardData.bug;
            var risk = this.state.openCardData.risk;
            var health_bug = 0;
            var health_risk = 0;
            if (bug) {
                for (let i=0; i < bug.length; i++) {
                    if (bug[i]["state"] != "Ignored" && bug[i]["state"] != "Solved") {
                        health_bug ++
                    }
                }
            }
            if (risk) {
                for (let i=0; i < risk.length; i++) {
                    if (risk[i]["state"] === "Created") {
                        health_risk ++
                    }
                }
            }    
            if (health_bug === 0 && health_risk === 0) {
                return (
                    <Tag color="success">health</Tag>
                )
            } else {
                return (
                    <Tag color="error">ill health</Tag>
                )
            }
        }

        const stepOptions = () => {
            return stepList.map(step => 
                <Step title={step} />    
            )
        }

        const drawerSave = () => {
            return (
                <Button type="primary" onClick={() => this.saveCard()} disabled={this.state.saveButton} >Save</Button>
            )
        }

        const showLog = () => {
            if (this.state.showLog) {
                return (
                    <div>
                        <br />
                        <Timeline>
                            {this.state.logData&&this.state.logData.map(log => (
                                <div><Timeline.Item>{log.time} {log.info}</Timeline.Item></div>
                            ))}
                        </Timeline>
                    </div>
                )
            } else {
                return(<div></div>)
            } 
        }

        const NotificationGhost = () => {
            var state = this.state.currentState;
            if (state === "kick off" || state === "desk check") {
                return (
                    <div>
                        <Divider orientation="left">Notification</Divider>
                        <Row>
                            <Col span={20}>
                                <Select
                                    key={this.state.openCardData.index + "sendMsg"}
                                    mode="multiple"
                                    allowClear
                                    style={{width: '100%'}}
                                    onChange={this.switchSendMembers}
                                    onDropdownVisibleChange={() => this.getSelectMember("all") }
                                    options={this.state.membersOptions}
                                >
                                </Select>
                            </Col>
                            <Col span={2} offset={2}>
                                <Button type="primary" onClick={() => this.sendNotification()}><WechatOutlined /></Button>
                            </Col>
                        </Row>
                        <br />
                    </div>
                )
            } else {
                return (
                    <div></div>
                )
            }
        }

        return (
            <div>
                <Drawer
                    title={this.showCardTitle()}
                    width={1560}
                    placement="right"
                    // closable={true}
                    onClose={this.closeActionDrawer}
                    visible={this.state.visibleDrawer}
                    extra={drawerSave()}
                >
                    <ProCard split="vertical">
                        <ProCard colSpan={12}>
                            <Divider orientation="left">Information</Divider>
                                <Descriptions bordered size="small" column={2}>
                                    <Descriptions.Item label="Sprint">{this.state.openCardData.sprint}</Descriptions.Item>
                                    <Descriptions.Item label="Point">{this.state.openCardData.point}</Descriptions.Item>
                                    <Descriptions.Item label="Type">{this.state.openCardData.type}</Descriptions.Item>
                                    <Descriptions.Item label="Health">{showHealthTag()}</Descriptions.Item>
                                    <Descriptions.Item label="Original link"></Descriptions.Item>
                                </Descriptions>
                                <br />
                                <Row>
                                    <Col span={6}>
                                        <label>Dev Owners</label>
                                    </Col>
                                    <Col span={18}>
                                        <Select
                                            key={this.state.openCardData.index + "dev"}
                                            // mode="multiple"
                                            allowClear
                                            style={{width: '100%'}}
                                            onChange={this.switchDevMember}
                                            onDropdownVisibleChange={() => this.getSelectMember("dev") }
                                            options={this.state.membersOptions}
                                            defaultValue={this.state.openCardData.dev}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={6}>
                                        <label>QA Owners</label>
                                    </Col>
                                    <Col span={18}>
                                        <Select
                                            key={this.state.openCardData.index + "qa"}
                                            // mode="multiple"
                                            allowClear
                                            style={{width: '100%'}}
                                            onChange={this.switchQAMember}
                                            onDropdownVisibleChange={() => this.getSelectMember("qa")}
                                            options={this.state.membersOptions}
                                            defaultValue={this.state.openCardData.qa}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={6}>
                                        <label>Acceptance Criteria</label>
                                    </Col>
                                    <Col span={18}>
                                        <TextArea 
                                            rows={6} 
                                            key={this.state.openCardData.index + "ac"} 
                                            onChange={this.updateAC}
                                            defaultValue={this.state.openCardData.ac}
                                        />
                                    </Col>
                                </Row>
                            <br />
                            <Divider orientation="left">Workflow</Divider>
                            <Steps 
                                current={this.currentStep(this.state.currentState)} 
                                status={this.stepTagStatus(this.state.currentState)} 
                                key={this.state.currentState}
                                labelPlacement="vertical"
                            >
                                {stepOptions()}
                            </Steps>
                            <br />
                            <Row>
                                <Col span={8}>
                                    <Button 
                                        type="primary" 
                                        block 
                                        onClick={() => this.switchStepButton("back")}
                                        disabled={this.disabledStepButton("back")}
                                    >
                                        <DoubleLeftOutlined />Step Back
                                    </Button>
                                </Col>
                                <Col span={8} offset={4}>
                                    <Button 
                                        type="primary" 
                                        block 
                                        onClick={() => this.switchStepButton("next")}
                                        disabled={this.disabledStepButton("next")}
                                    >
                                        Step Next<DoubleRightOutlined />
                                    </Button>
                                </Col>
                                <Col span={2} offset={2}>
                                    <Button 
                                        block
                                        type="dashed"
                                        onClick={() => this.switchLog()}
                                        // disabled={this.showButton(this.state.openCardData.state)}
                                    >
                                        Log
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18}>
                                    {showLog()}
                                </Col>
                            </Row>
                            <br />
                            {NotificationGhost()}
                            <Divider orientation="left">Associated Cards</Divider>
                            <CardTable 
                                key={this.state.openCardData.index + "card" + this.state.updateCardTime} 
                                data={this.state.currentAssociation} 
                                index={this.state.openCardData.index}
                            />
                            <Button type="dashed" onClick={() => this.openImportCardModal()} block>
                                <PlusOutlined />Create association cards
                            </Button>
                            <ImportCardModal
                                ref={this.importCardRef}
                                index={this.state.openCardData.index}
                                updateAssociation={this.updateCardTable}
                            />
                        </ProCard>
                        <ProCard colSpan={12}>
                            <Divider orientation="left">Quality Risk</Divider>
                            <EditableTable 
                                key={this.state.openCardData.index + "risk"} 
                                type="risk" 
                                data={this.state.openCardData.risk}
                                handle={(data)=>{this.updateCardRisk(data)}}
                            />
                            <br />
                            <Divider orientation="left">Task List</Divider>
                            <EditableTable 
                                key={this.state.openCardData.index + "task"} 
                                type="task" 
                                data={this.state.openCardData.task}
                                handle={(data)=>{this.updateCardTask(data)}}
                            />
                            <br />
                            <Divider orientation="left">Case List</Divider>
                            <Row>
                                <Col span={5} offset={18}>
                                    <Button onClick={() => this.openImportCaseModal()}>Import History Cases</Button>
                                </Col>
                            </Row>
                            <br />
                            <CaseTable 
                                key={this.state.openCardData.index + "case" + this.state.updateCaseTime} 
                                data={this.state.currentCases} 
                                index={this.state.openCardData.index}
                                handle={(data)=>{this.updateCaseData(data)}}
                            />
                            <Button type="dashed" onClick={() => this.openAddCaseModal()} block>
                                <PlusOutlined />Create a new case
                            </Button>
                            <br />
                            <AddCaseModal 
                                ref={this.addCaseRef}
                                index={this.state.openCardData.index}
                                updateCase={this.updateCaseTable} 
                            />
                            <ImportCaseModal
                                ref={this.importCaseRef}
                                index={this.state.openCardData.index}
                                updateCase={this.updateCaseTable}
                            />
                        </ProCard>
                    </ProCard>
                </Drawer>
            </div>
        );
    }

}

export default ActionDrawer;
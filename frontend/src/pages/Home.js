import React, { Component } from 'react';
import { LocalStorageUtils } from '../utils';

import { Chat, Channel, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import {Api} from '../utils';
import {apiurl, chat_key} from '../config';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            chatToken: null
        }
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        const {chatToken} = this.state
        this.setState({isLoading: true})
        if (chatToken === null) {
            Api.get(`${apiurl}/api/get_chat_token`)
            .then(response=>{
                this.setState({isLoading: false, chatToken: response.data.token})
            })
            .catch(error=>{
                this.setState({isLoading: false})
                alert(error.message)
            })
        }
    }
    
    logout() {
        LocalStorageUtils.clearState()
        window.location.href="/"
    }
    render() {
        const {chatToken, isLoading} = this.state
        const username = LocalStorageUtils.loadState("username")
        const chatClient = new StreamChat(chat_key); 
        let channel = null
        if (chatToken) {
            chatClient.setUser(
                {
                    id: username,
                    name: username,
                    image: `https://loremflickr.com/320/240/${username}`
                },
                chatToken,
            );
            channel = chatClient.channel('messaging', 'upwork', {
                // add as many custom fields as you'd like
                image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
                name: 'About Upwork',
            });
        }

        return (<div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid gray', padding: '0 30px'}}>
                <h2>Demo Chat App</h2>
                <button onClick={this.logout}>Logout</button>
            </div>
            <div>
                {isLoading
                    ? <div>fetching chat token...</div>
                    : <Chat client={chatClient} theme={'messaging light'}>
                        <Channel channel={channel}>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                        </Channel>
                    </Chat>
                }
            </div>
        </div>)
    }
}
  
export default Home; 
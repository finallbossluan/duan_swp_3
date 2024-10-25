import { useState } from 'react';
import { FaHeadset, FaTimes } from 'react-icons/fa'; // Import Font Awesome icons

function SupportCustomer() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [unreadCount, setUnreadCount] = useState(2);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setUnreadCount(0); 
    };

    const sendMessage = () => {
        if (message.trim()) {
            alert(`Your message: "${message}" sent!`);
            setMessage(''); 
        } else {
            alert('Please enter a message before sending.');
        }
    };

    return (
        <div>
            <div id="chatButtonContainer">
                <button id="chatBtn" onClick={toggleChat}>
                    <FaHeadset size={24} />
                    {unreadCount > 0 && <span id="unreadCount">{unreadCount}</span>}
                </button>
            </div>

            {isOpen && (
                <div id="chatPopup" className="popup">
                    <div className="popup-header">
                        <FaTimes className="close" onClick={toggleChat} />
                        <h2>Support</h2>
                    </div>
                    <div className="popup-content">
                        <textarea
                            id="chatInput"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Hi! What do you need?...">
                        </textarea>
                        <button id="sendMsg" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SupportCustomer;

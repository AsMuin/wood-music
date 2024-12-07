import useOnMounted from '@/Hooks/lifeCycle/onMounted';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

type Position = 'topStart' | 'topEnd' | 'topCenter' | 'bottomStart' | 'bottomEnd' | 'middleCenter';
type MessageType = 'info' | 'success' | 'warning' | 'error';

interface IMessageProps {
    position?: Position;
    id: string;
    type?: MessageType;
    message?: string;
    duration?: number;
}

let addMessage: (message: Omit<IMessageProps, 'id'>) => void;
function MessageManager() {
    const [messageList, setMessageList] = useState<Record<Position, IMessageProps[]>>({
        topStart: [],
        topEnd: [],
        topCenter: [],
        bottomStart: [],
        bottomEnd: [],
        middleCenter: []
    });
    addMessage = useCallback((message: Omit<IMessageProps, 'id'>) => {
        const { position = 'topCenter' } = message;
        setMessageList(prev => ({
            ...prev,
            [position]: [...prev[position], { id: (Math.random() + Date.now()).toString(36).substr(2, 9), ...message }]
        }));
    }, []);
    const removeMessage = useCallback((position: Position, id: string) => {
        setMessageList(prev => ({
            ...prev,
            [position]: prev[position].filter(message => message.id !== id)
        }));
    }, []);
    const messageConfig: {
        position: Position;
        messageList: IMessageProps[];
        className: string;
    }[] = [
        { position: 'topStart', messageList: messageList.topStart, className: 'toast toast-start toast-top' },
        { position: 'topEnd', messageList: messageList.topEnd, className: 'toast toast-end toast-top' },
        { position: 'topCenter', messageList: messageList.topCenter, className: 'toast toast-center toast-top' },
        { position: 'bottomStart', messageList: messageList.bottomStart, className: 'toast toast-start toast-bottom' },
        { position: 'bottomEnd', messageList: messageList.bottomEnd, className: 'toast toast-end toast-bottom' },
        { position: 'middleCenter', messageList: messageList.middleCenter, className: 'toast toast-center toast-middle' }
    ];
    return createPortal(
        <>
            {messageConfig.map(({ position, messageList, className }) => (
                <div key={position} className={className}>
                    {messageList.map(message => (
                        <Message key={message.id} {...message} removeMessage={(id: string) => removeMessage(position, id)} />
                    ))}
                </div>
            ))}
        </>,
        document.body
    );
}

function Message({
    id,
    type = 'info',
    message = '',
    duration = 3000,
    removeMessage
}: { removeMessage: (id: string) => void } & Omit<IMessageProps, 'position'>) {
    function getIcon(type: MessageType) {
        switch (type) {
            case 'info': {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                );
            }

            case 'success': {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            }

            case 'warning': {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                );
            }

            case 'error': {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
            }

            default: {
                return null;
            }
        }
    }
    useOnMounted(() => {
        setTimeout(() => {
            removeMessage(id);
        }, duration);
    });
    return (
        <div className={`alert alert-${type}`}>
            {getIcon(type)}
            <span>{message}</span>
        </div>
    );
}

export default MessageManager;

export const showMessage = (message: Omit<IMessageProps, 'id'>) => {
    if (addMessage) {
        addMessage(message);
    } else {
        throw new Error('addMessage is not defined');
    }
};

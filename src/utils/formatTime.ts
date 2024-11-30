type TimeType = 'hh:mm:ss' | 'mm:ss' | 'ss';
function formatTime(seconds: number, type: TimeType = 'mm:ss') {
    switch (type) {
        case 'hh:mm:ss': {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const seconds_ = Math.floor(seconds % 60);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds_.toString().padStart(2, '0')}`;
        }
        case 'mm:ss': {
            const minutes = Math.floor(seconds / 60);
            const seconds_ = Math.floor(seconds % 60);
            return `${minutes.toString().padStart(2, '0')}:${seconds_.toString().padStart(2, '0')}`;
        }
        case 'ss': {
            return seconds.toString().padStart(2, '0');
        }
    }
}
export { formatTime };

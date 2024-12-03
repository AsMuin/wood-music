import { useMemo, useState } from 'react';

function useToggle<D = any, R = any>(defaultValue: D, reverseValue: R) {
    const [value, setValue] = useState<D | R>(defaultValue);
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;
    const actions = useMemo(() => {
        function toggle() {
            setValue(prev => (prev === defaultValue ? reverseValueOrigin : defaultValue));
        }
        function set(value: D | R) {
            setValue(value);
        }
        function setDefault() {
            setValue(defaultValue);
        }
        function setReverse() {
            setValue(reverseValueOrigin);
        }
        return {
            toggle,
            set,
            setDefault,
            setReverse
        };
    }, []);
    return [value, actions];
}

export default useToggle;

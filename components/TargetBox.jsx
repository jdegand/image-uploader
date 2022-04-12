/*
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import Image from 'next/image';

const style = {
    border: '3px dashed blue',
    height: '15rem',
    width: '15rem',
    padding: '2rem',
    textAlign: 'center',
};
export const TargetBox = (props) => {

    const { onDrop } = props;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [NativeTypes.FILE],
        drop(item) {
            if (onDrop) {
                onDrop(item);
            }
        },
        canDrop(item) {
            console.log('canDrop', item.files, item.items);
            return true;
        },
        hover(item) {
            console.log('hover', item.files, item.items);
        },
        collect: (monitor) => {
            const item = monitor.getItem();
            if (item) {
                console.log('collect', item.files, item.items);
            }
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            };
        },
    }), [props]);
    const isActive = canDrop && isOver;
    return (<div ref={drop} style={style}>
            <Image
                src="/image.svg"
                alt=""
                width={150}
                height={150}
            />
            {isActive ? 'Release to drop' : 'Drag & Drop file here'}
		</div>);
};
*/


import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import Image from 'next/image';
const style = {
    border: '3px dashed blue',
    height: '15rem',
    width: '15rem',
    padding: '2rem',
    textAlign: 'center',
};
export const TargetBox = (props) => {
    const { onDrop } = props;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [NativeTypes.FILE],
        drop(item) {
            if (onDrop) {
                onDrop(item);
            }
        },
        canDrop(item) {
            console.log('canDrop', item.files, item.items);
            return true;
        },
        hover(item) {
            console.log('hover', item.files, item.items);
        },
        collect: (monitor) => {
            const item = monitor.getItem();
            if (item) {
                console.log('collect', item.files, item.items);
            }
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            };
        },
    }), [props]);
    const isActive = canDrop && isOver;
    return (<div ref={drop} style={style}>
			<Image
                src="/image.svg"
                alt=""
                width={150}
                height={150}
            />
            {isActive ? 'Release to drop' : 'Drag & Drop file here'}
		</div>);
};
import {
    Component,
    PureComponent,
    useEffect,
    useState,
    memo,
    useMemo,
} from "react";

import styles from "./OptimizingPage.module.css";

// 常见不规范写法：key=index
// key 值标记了节点在当前层级下的唯一性，因此我们尽量不要取值index，因为在同一层级下，多个循环的index 容易重复。
// 并且如果涉及节点的增加、删除、移动，那么key 的稳定性将会被破坏，节点就会出现混乱现象。

// 首先要明确一点，复用组件和重新渲染组件是两个概念。
// 1. 复用组件：指的是组件的实例是否被复用，如果被复用，那么组件的生命周期函数就不会被触发。
// 2. 重新渲染组件：指的是组件的render函数是否被调用，如果render函数被调用，那么组件的内容就会被重新渲染。
export function OptimizingPage(props) {

    const [arr, setArr] = useState([0, 1, 2, 3]);

    return (

        <div className={styles.border}>

            <h3>常用的性能优化</h3>

            {console.log("OptimizingPage render")} {/* 每次arr改变，都会触发重新渲染*/}
            <button
                onClick={() => {
                    setArr([...arr, arr.length]);
                    // setArr(arr.push(arr.length));   // 改成这样，不会触发重新渲染，因为arr没有发生变化，只是push了一个元素
                }}
            >
                修改数组
            </button>


            {/*{arr.map((item, index) => {*/}
            {/*    return <Child key={"Child" + item} item={item}/>;*/}
            {/*})}*/}

            {/*{arr.map((item, index) => {*/}
            {/*    return <ChildMemo key={"Child" + item} item={item}/>;*/}
            {/*})}*/}

            {
                arr.map((item, index) => {
                    return <ChildUseMemo key={"Child" + item} item={item}/>
                })
            }
        </div>
    );
}


// 在下面这个例子中，由于Key是一样的，所以组件被复用了，但是由于父组件的状态发生了变化，render函数被调用，所以组件的内容被重新渲染了。
function Child({item}) {
    useEffect(() => {
        return () => {
            console.log("destroy"); //sy-log
        };
    }, []);

    console.log("Child", item); //sy-log
    return (<div className={styles.border}>
        {item}
    </div>);
}

// 而用memo包裹的组件，只有在props改变时，才会重新渲染
const ChildMemo = memo(Child, (prev, next) => {
    // console.log("prev", prev.item, next.item); // 这里的item是一样的，所以不会触发重新渲染
    return prev.item === next.item;
});


function ChildUseMemo({item}) {
    return useMemo(() => <Child item={item}/>, [item]);    // 这里的[]表示只有item改变时，才会重新渲染
}

class ChildShouldComponentUpdate extends Component {

    // 如果返回false，那么组件就不会重新渲染
    shouldComponentUpdate(nextProps) {
        return this.props.item !== nextProps.item;
    }

    render() {
        console.log("ChildComponent", this.props.item);
        return (
            <div className={styles.border}>
                <p>{this.props.item}</p>
            </div>
        );
    }
}

// PureComponent 同 Component， 但是前者会浅比较 props 和 state 以及减少错过必要更新的概率。
class ChildPureComponent extends PureComponent {
    render() {
        console.log("ChildPureComponent"); //sy-log
        return (
            <div className={styles.border}>
                <p>{this.props.item}</p>
            </div>
        );
    }
}

// 组件重新render 会导致组件进入协调，协调的核心就是我们常说的vdom diff，所以
// 协调本身就是比较耗时的算法，因此如果能够减少协调，复用旧的fiber 节点，那么
// 肯定会加快渲染完成的速度。组件如果没有进入协调阶段，我们称为进入 bailout 阶
// 段，意思就是这层组件退出更新。
// 让组件进入 bailout 阶段，有以下方法：
// 1. 使用PureComponent
// 2. 使用React.memo    // React.memo 是一个高阶函数，它和 React.PureComponent 类似，但是它适用于函数组件。允许在 props 没有改变的情况下跳过重新渲染。
// 3. 使用shouldComponentUpdate
// 4. 使用useMemo，一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。
// 5. 使用useCallback，一个 React Hook，它在每次重新渲染的时候能够缓存函数的引用。

// Context 本身就是一个Provider 传递的value 变化，所有消费这个value 的后代组件都要更新，
// 因此应该尽量精简使用 Context。Context 使用场景：当祖先组件想要和后代组件快速通信。
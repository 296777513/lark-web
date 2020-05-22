import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server';


export interface Props { compiler: string, framework: string; }
type State = {
    number: number
}
export class Counter extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);
        console.log("test1111")
        this.state = {
            number: 0
        };
        window.document.addEventListener("DOMContentLoaded", () => {

        })
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
    }
    // 加1
    increase() {
        let self = this;
        self.setState({ number: self.state.number + 1 })
    }
    // 减一
    decrease() {
        let self = this;
        self.setState({ number: self.state.number - 1 })

    }


    render() {
        console.log("test1111")
        return (
            <div>
                <input type="button" value="减1" onClick={this.decrease} />
                <span> {this.state.number} </span>
                <input type="button" value="加1" onClick={this.increase} />
            </div>
        )
    }

}
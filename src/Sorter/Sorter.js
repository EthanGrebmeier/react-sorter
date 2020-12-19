import React from 'react'

import './Sorter.scss'

export default class Sorter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            numbers: [],
            elementOneIndex: 0,
            elementTwoIndex: 0,
            sortInProgress: false,
            algorithm: 'bubble',
            numberOfSwaps: 0,
            numberOfComparisons: 0,
            sortedIndex: 0,
        }
    }

    componentDidMount(){
        this.shuffleNumbers()
    }


    sort(algorithm){
        this.setState({
            sortInProgress: true,
            numberOfSwaps: 0,
            numberOfComparisons: 0,
        })
        console.log(algorithm)
        switch (algorithm) {
            case "bubble":
                this.bubbleSort(this.state.numbers)
                break
            case "insertion":
                this.insertionSort(this.state.numbers)
                break;
            case "selection":
                this.selectionSort(this.state.numbers)
                break;
            default:
                break;
        }
    }

    bubbleSort = (numbers) => {
        
        for (let i = 0; i < numbers.length - 1; i++){
          
          for (let j = 0; j < numbers.length - i - 1; j++){
            setTimeout(()=>{
                this.setState({
                    selectedElementTwo : j
                })
                
                if (numbers[j].value > numbers[j+1].value){
                    let swap = numbers[j];
                    numbers[j] = numbers[j+1];
                    numbers[j].index = j;
                    swap.index += 1; 
                    numbers[j+1] = swap;
                    this.incrementSwaps()
                }
                this.incrementComparisons()
                
                this.setState({
                    sortedIndex: numbers.length - i
                })
                
                if(i === numbers.length - 2){
                    let sortedIndex = numbers.length - i - 2;
                    this.setState({
                        sortedIndex: sortedIndex,
                        selectedElementOne: 4000,
                        selectedElementTwo: 4000,
                        sortInProgress: false
                    })
                    
                }
            }, i * 10)
          }
    
        }
    }

    insertionSort(numbers){
        for(let i=1; i < numbers.length; i++){
          
          let swap = numbers[i];
          let j = i-1; 
          
    
          setTimeout( () => {
            this.incrementComparisons();
            while (j >= 0 && numbers[j].value > swap.value){
              
              this.incrementComparisons();          
      
              numbers[j+1] = numbers[j];
              
              this.setState({
                  sortedIndex: i,
                  numbers: numbers
              })
              
              j -= 1;
              this.incrementSwaps()
                
            }
            numbers[j+1] = swap
            this.setState({
                selectedElementOne : i,
                selectedElementTwo : j,
                number: numbers,
            })            
          }, i * 60)
        }
        setTimeout( ()=> {
          this.setState({
              sortInProgress: false,
              selectedElementOne: -1,
              selectedElementTwo: -1
          })
        },numbers.length * 60)
      }

    selectionSort(numbers){
        for(let i = 0; i < numbers.length; i++){
            
          setTimeout(() =>{
            this.setState({
                sortedIndex: i
            })
            let min = i;
            for(let j = i+1; j < numbers.length; j++){
              this.incrementComparisons();
              if(numbers[j].value < numbers[min].value){
                min = j;
              }
            }
    
            let swap = numbers[min];
            

    
            numbers[min] = numbers[i];
            numbers[min].index = min;
            numbers[i] = swap;
            numbers[i].index = i;

            this.setState({
                selectedElementOne: swap.index,
                numbers: numbers
            })
            if(min !== i){
              this.incrementSwaps()
            }


          }, i * 60)
    
          
      }
      setTimeout( ()=> {
        this.sortInProgress = false;
        this.selectedElementTwo = -1;
        this.selectedElementOne = -1;
        this.setState({
            sortInProgress: false,
            selectedElementOne: -1,
            selectedElementTwo: -1,
        })
      },numbers.length * 60)
    }

    incrementSwaps = () => {
        let current = this.state.numberOfSwaps + 1
        this.setState({
            numberOfSwaps: current
        })
    }

    incrementComparisons = () => {
        let current = this.state.numberOfComparisons + 1
        this.setState({
            numberOfComparisons: current
        })
    }

    shuffleNumbers = () => {
        let numbers = []
        for(let i = 0; i < 100; i++){
            numbers.push({
              value: Math.floor(Math.random() * Math.floor(3000)),
              index: i});
          }
        this.setState({
            numbers: numbers,
            numberOfComparisons: 0,
            numberOfSwaps: 0
        })
    }

    getBarStyle = (number, numbersLength) => {
        if (this.state.mobile) {
            return this.getMobileBarStyle(number, numbersLength)
        } else {
            return this.getDesktopBarStyle(number, numbersLength)
        }
    }

    getDesktopBarStyle = (element, numBars) => {
        return {
            "width" : `${numBars / 100 - .3}%`,
            "height" : `${element.value / 3000 * 100}%`,
            "backgroundColor" : this.colorPicker(element)
        }
    }

    getMobileBarStyle = (element, numBars) => {
        return {
            "width" : `${element.value / 3000 * 100}%`,
            "height" : `${numBars / 100 - .3}%`,
            "backgroundColor" : this.colorPicker(element)
        }
    }

    getBars = (numbers) => {
        return (numbers.map((number, index) => {
            return (
            <div style={this.getBarStyle(numbers[index], this.state.numbers.length)}>
                
            </div>
            )
        }))
    }

    colorPicker = (num) => {
    
        if (num.index === this.state.selectedElementOne){
          return '#E56B6F';
        }
        if (num.index === this.state.selectedElementTwo){
          return '#EAAC8B';
        } else{
          if (num.index <= this.state.sortedIndex){
            return '#B56576';
          }
        }
        
        return '#8FBFE0';
        
    }

    handleChange = (event) => {
        this.setState({
            algorithm: event.target.value
        })
    }
    

    render(){
        return (
            <div className="interface-container">
                <div className="interface-options">
                    <div className="comparisons-swaps">
                        <h1> Comparisons: {this.state.numberOfComparisons} </h1>
                        <h1> Swaps: {this.state.numberOfSwaps} </h1>
                    </div>

                    <label className="select-sort"> 
                        Algorithm: 
                        <select className="select-sort-options" onChange={this.handleChange}>
                            <option value="bubble"> Bubble </option>
                            <option value="insertion"> Insertion </option>
                            <option value="selection"> Selection </option>
                        </select>
                    </label>

                    <div className="interface-buttons">
                        <button onClick={this.shuffleNumbers} disabled={this.state.sortInProgress}> Shuffle </button>
                        <button onClick={() => this.sort(this.state.algorithm)} disabled={this.state.sortInProgress}> Sort </button>
                    </div>
                    
                </div>
                
                <div className="bars-container">
                    <div className="bars"> 
                        {this.getBars(this.state.numbers)}
                    </div>
                    
                </div>
            </div>
        )
    }

}
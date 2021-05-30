import React, { Component } from 'react'
import ErrorMessage from './UI/Error/ErrorMessage'

export default class ErrorBoundary extends Component {
  
    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false
        }
    }
    
    static getDerivedStateFromError(error){
        return {
            hasError: true
        }
    }

    render() {
        if(this.state.hasError){
            return <ErrorMessage />
                
        }
        return this.props.children
    }
}

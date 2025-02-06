import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error('App Error:', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>عذراً، حدث خطأ ما</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ hasError: false })}
                        style={{ marginTop: 10, padding: 10 }}
                    >
                        <Text>إعادة المحاولة</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

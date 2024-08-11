'use client'
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import '../styles/index.css';
import ThemeProvider from '../theme/ThemeProvider';
import ErrorBoundary from "../../components/ErrorBoundary"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ErrorBoundary>
                    <Provider store={store}>
                        <ThemeProvider>
                            {children}
                        </ThemeProvider>
                    </Provider>
                </ErrorBoundary>
            </body>
        </html>
    )
}

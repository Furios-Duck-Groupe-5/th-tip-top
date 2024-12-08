import React, { createContext, useContext, useState, ReactNode } from "react";

// Define an interface for the authentication context
interface AuthContextType {
    isLoggedIn: boolean;
    roleId: number | null; // Add roleId to manage user roles
    login: (roleId: number) => void; // Modify login to accept roleId
    logout: () => void;

}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Provider for the authentication context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [roleId, setRoleId] = useState<number | null>(() => {
        const storedRoleId = localStorage.getItem("roleId");
        return storedRoleId ? parseInt(storedRoleId, 10) : null; 
    });

    const login = (roleId: number) => {
        setIsLoggedIn(true);
        setRoleId(roleId);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("roleId", roleId.toString()); 
    };

    const logout = () => {
        setIsLoggedIn(false);
        setRoleId(null); // Clear roleId on logout
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("roleId"); // Remove roleId from local storage
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, roleId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

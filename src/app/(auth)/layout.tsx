import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {props.children}
    </div>
  );
}

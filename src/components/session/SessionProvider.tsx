"use client";
import React, { useMemo, useState } from "react";
import SessionContext from "./SessionContext";

export default function SessionProvider({ children, ...props }: any) {
  const [session, setSession] = useState<any>(props.value?.user || {});

  const clearSession = () => {
    setSession({});
  };

  const isAdmin = useMemo(() => {
    return props.value.user.role.name === "Super";
  }, [props.value.user]);

  return (
    <SessionContext.Provider
      value={{ session, setSession, clearSession, isAdmin }}
    >
      {children}
    </SessionContext.Provider>
  );
}

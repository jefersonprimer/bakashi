'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const MyLists = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"fila" | "crunchylists" | "history">("fila");

  // Efeito para definir a aba ativa com base na URL
  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/watchlist") {
      setActiveTab("fila");
    } else if (path === "/crunchylists") {
      setActiveTab("crunchylists");
    } else if (path === "/history") {
      setActiveTab("history");
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "fila":
        return <div>Conteúdo da Fila</div>;
      case "crunchylists":
        return <div>Conteúdo das Crunchylistas</div>;
      case "history":
        return <div>Conteúdo do Histórico</div>;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Alinha ao topo
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        gap: "20px", // Para adicionar um espaçamento entre os elementos
      }}
    >
      <header style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"
              fill="currentColor"
            />
          </svg>
          Minhas Listas
        </h1>
      </header>
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Link href="/watchlist">
          <button
            onClick={() => setActiveTab("fila")}
            style={{
              padding: "10px",
              borderBottom: activeTab === "fila" ? "2px solid orange" : "none",
              cursor: "pointer",
            }}
          >
            Fila
          </button>
        </Link>
        <Link href="/crunchylists">
          <button
            onClick={() => setActiveTab("crunchylists")}
            style={{
              padding: "10px",
              borderBottom: activeTab === "crunchylists" ? "2px solid orange" : "none",
              cursor: "pointer",
            }}
          >
            Crunchylist
          </button>
        </Link>
        <Link href="/history">
          <button
            onClick={() => setActiveTab("history")}
            style={{
              padding: "10px",
              borderBottom: activeTab === "history" ? "2px solid orange" : "none",
              cursor: "pointer",
            }}
          >
            Histórico
          </button>
        </Link>
      </nav>
      <main style={{ textAlign: "center" }}>{renderContent()}</main>
    </div>
  );
};

export default MyLists;

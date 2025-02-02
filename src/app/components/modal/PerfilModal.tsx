import Link from "next/link";
import styles from "./PerfilModal.module.css";

const PerfilModal = () => {
    return (
        <>
            <div className={styles.profileContainer}>
                <img src="#" alt="foto de perfil" className={styles.profileImage} />
                <h2 className={styles.userName}>Nome do Usuário</h2>
                <Link href="/profiles/manage/7a5f7a55-f9dc-5b4e-862b-6610af73f7bb">
                    <span className={styles.editIcon}>✏️</span>
                </Link>
                <div className={styles.adBanner}>TESTE GRATUITO DE 7 DIAS</div>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.button}>Troca de Perfil</button>
                <button className={styles.button}>Configurações</button>
            </div>

            <div className={styles.linkGroup}>
                <Link href="#">Fila</Link>
                <Link href="#">Crunchylistas</Link>
                <Link href="#">Histórico</Link>
            </div>

            <Link href="#" className={styles.notificationSection}>
                <div>
                    <h2>Notificações</h2>
                    <span>Cartão e Presente</span>
                    <span>Você tem um cartão de presente? Resgate aqui.</span>
                </div>
            </Link>

            <button className={styles.logoutButton}>Sair</button>
        </>
    );
};

export default PerfilModal;

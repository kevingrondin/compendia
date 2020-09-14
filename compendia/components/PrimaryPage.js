import PrimaryHeader from "./PrimaryHeader";
import BottomNav from "./BottomNav";
import styles from "../styles/components/primary-page/PrimaryPage.module.scss";

export default function PrimaryPage(props) {
    return (
        <>
            <PrimaryHeader pageTitle={props.pageTitle} />
            <div className={styles.container}>{props.children}</div>
            <BottomNav />
        </>
    );
}

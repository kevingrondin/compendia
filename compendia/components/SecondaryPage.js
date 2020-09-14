import SecondaryPageHeader from "./SecondaryHeader";

export default function SecondaryPage(props) {
    return (
        <>
            <SecondaryPageHeader pageTitle={props.pageTitle} />
            {props.children}
        </>
    );
}

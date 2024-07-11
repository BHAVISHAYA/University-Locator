import "../styles/Header.css";
import { SearchBox } from "./SearchBox";

export const Header = () => {


    return (
        <>
            <div className="container-fluid header">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 py-3">
                        <h1>University Locator</h1>
                    </div>
                </div>
            </div>
            <SearchBox />
        </>
    )
}

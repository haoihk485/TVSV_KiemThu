import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, redirect } from "react-router-dom";
import {
    authLoadingSelector,
    isLogeedInSelector,
} from "../redux/selectors";

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    const isLoading = useSelector(authLoadingSelector);
    const isLoggedIn = useSelector(isLogeedInSelector);

    return (
        <Fragment>
            {!isLoading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (!isLoggedIn) {
                            return redirect('/login')
                        }
                        if (user.role === "ROLE_ADMIN") {
                            return <Component {...props} />;
                        } else {
                            return redirect('/')
                        }
                    }}
                />
            )}
        </Fragment>
    );
};

export default AdminProtectedRoute;

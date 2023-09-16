import { useState } from 'react';
import { Box, Typography, Button, TextField, useMediaQuery, useTheme, RadioGroup, Radio, FormControlLabel, Checkbox } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    picture: "",
    bloodgroup: "",
    Age: "",
    condition: "",
    requires: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}



const Form = () => {
    const [pageType, setPageType] = useState("Login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "Login";
    const isRegister = pageType === "Register";
    const [checkReDo, setReDo] = useState(false);
    const CheckedRedo = async () => {
        setReDo(!checkReDo);
    }
    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);

        }

        formData.append('picturePath', values.picture.name);
        console.log(checkReDo);

        const saveUserResponse = await fetch(
            "http://localhost:3001/auth/register", {
            method: 'POST',
            body: formData
        }
        );
        const savedUser = await saveUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
            setPageType("Login");
        }



    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        // console.log(loggedIn.msg === "Wrong Password");
        if (loggedIn.msg === "Wrong Password") {
            toast.warn(loggedIn.msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home");
        }

    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        else await register(values, onSubmitProps);
    };

    return (
        <Formik onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >

            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="BloodGroup"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.bloodgroup}
                                    name="bloodgroup"
                                    error={Boolean(touched.bloodgroup) && Boolean(errors.bloodgroup)}
                                    helperText={touched.bloodgroup && errors.bloodgroup}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Age"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Age}
                                    name="Age"
                                    error={Boolean(touched.Age) && Boolean(errors.Age)}
                                    helperText={touched.Age && errors.Age}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <FormControlLabel control={<Checkbox />} onChange={CheckedRedo} label="Recipient" />
                                {checkReDo && (
                                    <>
                                        <TextField
                                            label="Condition"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.condition}
                                            name="condition"
                                            error={Boolean(touched.condition) && Boolean(errors.condition)}
                                            helperText={touched.condition && errors.condition}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            label="Requires"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.requires}
                                            name="requires"
                                            error={Boolean(touched.requires) && Boolean(errors.requires)}
                                            helperText={touched.requires && errors.requires}
                                            sx={{ gridColumn: "span 2" }}
                                        /></>
                                )}

                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}>

                                                <input {...getInputProps()} />
                                                {!values.picture ? (<p>Add Picture</p>) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}

                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            type="password"
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                    <Box>
                        <Button fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }

                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography onClick={() => {
                            setPageType(isLogin ? "Register" : "Login")
                            resetForm();
                        }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                },
                            }}
                            textAlign="center"
                        >
                            {isLogin ? "Dont have an Account? Sign Up" : "Already Have an Account? Sign In"}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}



export default Form;
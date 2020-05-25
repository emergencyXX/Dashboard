import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Route, Switch} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems} from './listItems';
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useFormik} from 'formik';
import {connect} from "react-redux";
import {setData} from '../reducer';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    profileText: {
        marginRight: 15
    },
    avatar: {
        color: '#3f51b5',
        backgroundColor: '#fff'
    },
    input: {
        width: '100%',
        marginBottom: 15
    },
    preview: {
        width: 36,
        height: 36,
        backgroundSize: 'cover',
        borderRadius: '50%',
        marginLeft: 30
    },
    photoInput: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    submit: {
        backgroundColor: '#4caf50'
    },
    select: {
        width: '100%',
        maxWidth: 200,
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    formHeader: {
        marginBottom: 15
    },
    error: {
        marginBottom: 15,
        marginTop: -15,
        color: '#ff0000',
        fontSize: 12
    },
    errorSelect: {
        marginTop: 0,
        color: '#ff0000',
        fontSize: 12
    },
    errorPhoto: {
        marginLeft: 15,
        color: '#ff0000',
        fontSize: 12
    }
}));

let Dashboard = props => {
    const {setData, _firstName, _lastName, _status, _age, _photo, _gender} = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [photo, setPhoto] = React.useState(null);

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Required';
        } else if (values.firstName.length > 15) {
            errors.firstName = 'Must be 15 characters or less';
        }

        if (!values.lastName) {
            errors.lastName = 'Required';
        } else if (values.lastName.length > 20) {
            errors.lastName = 'Must be 20 characters or less';
        }
        if (!values.status) {
            errors.status = 'Required';
        } else if (values.status.length > 40) {
            errors.status = 'Must be 40 characters or less';
        }
        if (!values.age) {
            errors.age = 'Required';
        }
        if (!values.upload) {
            errors.upload = 'Required';
        }


        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            status: '',
            age: '',
            upload: '',
            gender: 'female',
        },
        validate,
        onSubmit: values => {
            setData({...values, photo})
        },
    });


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <Switch>
                            <Route path="/" exact render={() => 'Dashboard'}/>
                            <Route path="/profile" exact render={() => 'Profile'}/> }/>
                        </Switch>
                    </Typography>
                    <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.profileText}>
                        {`${_firstName} ${_lastName}`}
                    </Typography>
                    {_photo ? <Avatar src={_photo} className={classes.avatar}/> : <Avatar className={classes.avatar}>AA</Avatar>}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Switch>
                            <Route path="/" exact render={() => (
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography component="h4" variant="h6" color="inherit" noWrap
                                                className={classes.profileText}>
                                        Welcome to Dashboard.
                                    </Typography>
                                </Grid>
                            )}/>
                            <Route path="/profile" exact render={() => (
                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography component="h4" variant="h6" color="inherit" noWrap
                                                className={classes.formHeader}>
                                        Edit your profile
                                    </Typography>
                                    <form className={classes.form} onSubmit={formik.handleSubmit} autoComplete="off">
                                        <TextField
                                            name="firstName"
                                            id="outlined-basic"
                                            label="Firts name"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            value={formik.values.firstName}
                                            className={classes.input}/>
                                        {formik.errors.firstName &&
                                        <p className={classes.error}>{formik.errors.firstName}</p>}
                                        <TextField
                                            name="lastName"
                                            id="outlined-basic"
                                            label="Second name"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            value={formik.values.lastName}
                                            className={classes.input}/>
                                        {formik.errors.lastName &&
                                        <p className={classes.error}>{formik.errors.lastName}</p>}
                                        <div className={classes.line}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Gender</FormLabel>
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gender"
                                                    value={formik.values.gender}
                                                    onChange={formik.handleChange}
                                                >
                                                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                                </RadioGroup>
                                                {formik.errors.gender &&
                                                <p className={classes.error}>{formik.errors.gender}</p>}
                                            </FormControl>
                                            <FormControl className={classes.select}>
                                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="age"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.age}
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                                {formik.errors.age &&
                                                <p className={classes.errorSelect}>{formik.errors.age}</p>}
                                            </FormControl>
                                        </div>
                                        <div className={classes.photoInput}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                component="label">
                                                Upload Avatar
                                                <input
                                                    name="upload"
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                    //onChange={e => setPhoto(URL.createObjectURL(e.target.files[0]))}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        setPhoto(URL.createObjectURL(e.target.files[0]))
                                                    }}
                                                    value={formik.values.upload}
                                                    type="file"
                                                    style={{display: "none"}}
                                                />
                                            </Button>
                                            {formik.values.upload && <div style={{'backgroundImage': `url(${photo})`}}
                                                                          className={classes.preview} alt=""/>}
                                            {formik.errors.upload &&
                                            <p className={classes.errorPhoto}>{formik.errors.upload}</p>}
                                        </div>
                                        <TextField
                                            label="Status"
                                            name="status"
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            rowsMax={5}
                                            className={classes.input}
                                            onChange={formik.handleChange}
                                            value={formik.values.status}
                                        />
                                        {formik.errors.status &&
                                        <p className={classes.error}>{formik.errors.status}</p>}
                                        <Button
                                            type='submit'
                                            variant="contained"
                                            className={classes.submit}
                                        >
                                            Sumbmit
                                        </Button>
                                    </form>
                                </Grid>
                            )}/> }/>
                        </Switch>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        _firstName: state.app.firstName,
        _lastName: state.app.lastName,
        _status: state.app.status,
        _age: state.app.age,
        _photo: state.app.photo,
        _gender: state.app.gender,
    };
};


export default connect(mapStateToProps, {setData})(Dashboard);
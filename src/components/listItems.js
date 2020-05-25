import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
        link: {
            textDecoration: 'none',
            color:'#757575'
        }
    }
));



const CustomLink = (props)=> {
    const {to, icon, name} = props;
    const classes = useStyles();
    return(
        <Link className={classes.link} to={to}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name}/>
            </ListItem>
        </Link>
        );
}



export const mainListItems = (
    <div>
        <CustomLink to="/" icon={<DashboardIcon/>} name="Dashboard" />
        <CustomLink to="/profile" icon={<PersonIcon/>} name="Profile" />
    </div>
);


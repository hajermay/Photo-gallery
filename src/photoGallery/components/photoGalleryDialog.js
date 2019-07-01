import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, TextField, useMediaQuery, useTheme} from '@material-ui/core';


export default function PhotoGalleryDialog(props) {
    const {dialogContentStyle, getInputData, closeDialog, sendComment, openDialog, img, requiredText} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            maxWidth={"lg"}
            open={openDialog}
            onClose={closeDialog}
        >
            <DialogContent className={dialogContentStyle}>
                <img src={img}/>
                <span>{requiredText}</span>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Add comment here"
                    type="text"
                    fullWidth
                    onChange={getInputData}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Close
                </Button>
                <Button onClick={sendComment} color="primary">
                    Send comment
                </Button>
            </DialogActions>
        </Dialog>
    );
}

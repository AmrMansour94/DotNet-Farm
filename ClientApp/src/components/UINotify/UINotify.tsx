import notify from 'devextreme/ui/notify';


const UINotify = {
    success: (message:  string ) => {
        notify(message, "success", 5000)},

    error: (message:string) => {
            notify(message, "error", 5000)}

};

export default UINotify; 

export default function GoogleButton(props){

    return (
    <>
        <script src="https://accounts.google.com/gsi/client" async defer></script>

        <div id="g_id_onload"
        data-client_id={props.googleClientKey}
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/api/gsignin"
        data-auto_prompt="false">
        </div>

        <div className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
        </div>
    </>
    )
}
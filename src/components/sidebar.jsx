import "../assets/css/sidebar.css";
import logo12H from "../assets/img/logo12h.png";
import ConfigIcon from "../assets/img/configIcon.png";
export const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="GACinfo">
          <img src={logo12H} />
          <h1>GAC</h1>
        </div>
        <div className="MenuSideBar">
          <ul>
            <a>
              <li>Hogar</li>
            </a>
            <a>
              <li>Asistencia</li>
            </a>
            <a>
              <li>Calificaciones</li>
            </a>
            <a>
              <li>Historial</li>
            </a>
          </ul>
        </div>
        <div className="handleUser">
          <section className="userInfo">
            <p className="Username">{localStorage.getItem('usuario')}</p>
            <p className="subText Role">Role</p>
          </section>
          <section className="config">
            <a>
              <img src={ConfigIcon} className="cicon"></img>
            </a>
          </section>
        </div>
      </div>
    </>
  );
};

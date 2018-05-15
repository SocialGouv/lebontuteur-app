import FaSearch from "react-icons/lib/fa/search";
import "../../static/css/custom.css";
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.css";
import "../../static/css/hero.css";
import "../../static/css/panel.css";
import "../../static/css/footer.css";
import "../../node_modules/react-tabs/style/react-tabs.css";
import Form from "react-jsonschema-form";
import apiFetch from "./Api";
import ModalCloseMesure from "./ModalCloseMesure";
import Cell from "./Cell";
import styled from "styled-components";
import ModalMesure from "./ModalMesure";

const TdCursor = styled.tr`
  cursor: url("../../static/images/edit.svg"), auto;
`;
const formData = {};
const edit = require("../../static/images/edit.svg");

export const TableRowMesureView = ({
  date_ouverture,
  type,
  code_postal,
  ville,
  civilite,
  annee,
  extinction,
  openModal,
  isOpen,
  onRequestClose,
  onClick,
  onClickSubmit,
  onClickClose,
  display_ext,
  display,
  updateedit,
  outEdit,
  isOpenMesure,
  openModalMesure,
  onClickSubmitMesure,
  formData,
  onClickSubmitEteinte,
  display_row
}) => (
  <tr style={{ display: display_row }}>
    <td
      style={{
        fontSize: "0.8em",
        color: "rgb(204, 204, 204)",
        textAlign: "left",
        lineHeight: "40px"
      }}
    >
      {date_ouverture.slice(0, 10)}
    </td>
    <Cell>
      <b>
        {code_postal} -{ville}{" "}
      </b>
    </Cell>
    <Cell>{type}</Cell>
    <Cell>{civilite} </Cell>
    <Cell>{annee} </Cell>
    <td
      style={{
        fontSize: "0.8em",
        color: "rgb(204, 204, 204)",
        textAlign: "left",
        lineHeight: "40px",
        display: display
      }}
    >
      {/*btn btn-outline-secondary*/}
      <button className={"btn btn-success"} onClick={openModalMesure}>
        Modifier
      </button>
      <ModalMesure
        isOpenMesure={isOpenMesure}
        onRequestClose={onRequestClose}
        onClick={onClick}
        onClickSubmitMesure={onClickSubmitMesure}
        onClickClose={onClickClose}
        formData={formData}
      />
    </td>
    <td
      style={{
        fontSize: "0.8em",
        color: "rgb(204, 204, 204)",
        textAlign: "left",
        lineHeight: "40px",
        display: display
      }}
    >
      {/*btn btn-outline-secondary*/}
      <button className={"btn btn-success"} onClick={openModal}>
        Mettre fin au mandat
      </button>
      <ModalCloseMesure
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onClick={onClick}
        onClickSubmit={onClickSubmit}
        onClickClose={onClickClose}
      />
    </td>
    <td
      style={{
        fontSize: "0.8em",
        color: "rgb(204, 204, 204)",
        textAlign: "left",
        lineHeight: "40px",
        display: display_ext
      }}
    >
      {/*btn btn-outline-secondary*/}
      <button className={"btn btn-success"} onClick={onClickSubmitEteinte}>
        Mesure en cours
      </button>
    </td>
    <td
      style={{
        fontSize: "0.8em",
        color: "rgb(204, 204, 204)",
        textAlign: "left",
        lineHeight: "40px",
        display: display_ext
      }}
    >
      {extinction}
    </td>
  </tr>
);

class TableRowMesure extends React.Component {
  state = {
    mesureId: "",
    modalIsOpen: false,
    modalIsOpenMesure: false,
    showModal: false,
    showTD: false
  };

  onSubmit = ({ formData }) => {
    apiFetch(`/mandataires/1/mesures/${this.props.currentMesures.id}`, {
      method: "PUT",
      body: JSON.stringify({
        date_ouverture: formData.date_ouverture,
        code_postal: formData.code_postal,
        type_mesure: formData.type_mesure,
        genre: formData.genre,
        age: formData.age,
        status: formData.status
      })
    }).then(json => {
      this.props.updateMadataire(json);
    });
  };

  onClick = (e, formData) => {
    console.log("formData ", formData);
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Eteindre mesure",
        extinction: formData.extinction
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    })
      .then(json => {
        return apiFetch(`/mandataires/1/capacite`, {
          method: "PUT"
        }).then(() => {
          return json;
        });
      })
      .then(json2 => {
        this.closeModal();
        this.props.updateMesureEteinte(); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  onClickEteinte = e => {
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Mesure en cours",
        extinction: null
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    })
      .then(json => {
        return apiFetch(`/mandataires/1/capacite`, {
          method: "PUT"
        }).then(() => {
          return json;
        });
      })
      .then(json2 => {
        this.props.updateMesureEteinte(); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  onClickMesure = (e, formData) => {
    console.log("formData ", formData);
    apiFetch(`/mandataires/1/mesures/${e}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Eteindre mesure",
        extinction: formData.extinction
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    })
      .then(json => {
        return apiFetch(`/mandataires/1/capacite`, {
          method: "PUT"
        }).then(() => {
          return json;
        });
      })
      .then(json2 => {
        this.closeModal();
        this.props.updateMesureEteinte(); // callback parent with data
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  openModal = ({ mandataire }) => {
    this.setState({ modalIsOpen: true, mesureId: mandataire });
  };

  handleOpenModal = mandataire => {
    this.setState({ modalIsOpenMesure: true, mesureId: mandataire });
  };
  closeModalAnnuler = ({ formData }) => {
    this.onClick(this.props.mesure.id, formData);
  };
  closeModalAnnulerMesure = ({ formData }) => {
    this.onClickMesure(this.props.mesure.id, formData);
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalIsOpenMesure: false });
  };

  showTr = mesure => {
    if (mesure.status === "Mesure en cours") {
      this.setState({ showTD: true });
    } else {
      this.setState({ showTD: false });
    }
  };

  render() {
    const {
      ville,
      type,
      nom,
      contact,
      residence,
      code_postal,
      dispo_max,
      date_ouverture,
      type_mesure,
      genre,
      age,
      status,
      annee,
      civilite,
      extinction
    } = this.props.mesure;

    const formData = {
      ouverture: `${date_ouverture}`,
      codePostal: `${code_postal}`,
      civilite: `${civilite}`,
      annee: `${annee}`,
      commune: `${ville}`,
      residence: `${residence}`,
      type: `${type}`
    };

    return (
      <TableRowMesureView
        openModal={() => this.openModal(this.props.mesure.id)}
        openModalMesure={() => this.handleOpenModal(this.props.mesure.id)}
        date_ouverture={date_ouverture}
        code_postal={code_postal}
        ville={ville}
        formData={formData}
        civilite={civilite}
        annee={annee}
        type={type}
        display_ext={this.props.display_ext}
        display={this.props.display}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        onClick={this.closeModal}
        onClickSubmit={this.closeModalAnnuler}
        onClickClose={this.closeModal}
        isOpenMesure={this.state.modalIsOpenMesure}
        onClickSubmitMesure={this.closeModalAnnulerMesure}
        onClickSubmitEteinte={() => this.onClickEteinte(this.props.mesure.id)}
        display_row={this.state.showTD}
      />
    );
  }
}

export default TableRowMesure;

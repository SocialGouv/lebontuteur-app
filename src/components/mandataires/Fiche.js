import { Phone, Smartphone, Mail, Home } from "react-feather";
import styled from "styled-components";

const iconStyle = { width: 22, height: 22, marginRight: 10 };

const H3 = styled.h3`
  display: ${props => props.display};
`;
// fiche recap
const FicheMandataire = ({
  email = "",
  telephone = "",
  telephone_portable = "",
  adresse = "",
  code_postal = "",
  ville = "",
  dispo_max = 0,
  secretariat = false,
  nb_secretariat = 0,
  displayTitle
}) => {
  const hasAdresse = adresse || code_postal || ville;
  return (
    <div>
      <H3 display={displayTitle}>Mes coordonnées</H3>
      {(email && (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-email">
          <Mail style={iconStyle} />
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      )) ||
        null}
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone">
        <Phone style={iconStyle} />
        {telephone}
      </div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone-portable">
        <Smartphone style={iconStyle} />
        {telephone_portable}
      </div>
      {hasAdresse && (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-adresse">
          <Home style={iconStyle} />
          {adresse} {code_postal} {ville}
        </div>
      )}
      <br />
      <table style={{ width: 400 }} cellPadding={5}>
        <tbody style={{ fontSize: "1.1em" }}>
          <tr>
            <td style={{ borderRight: "1px solid silver", borderBottom: "1px solid silver" }}>
              <b>Nombre de mesures souhaitées</b>
            </td>
            <td
              data-cy="fiche-manda-dispo-max"
              style={{ textAlign: "center", borderBottom: "1px solid silver" }}
            >
              {dispo_max}
            </td>
          </tr>
          <tr>
            <td style={{ borderRight: "1px solid silver" }}>
              <b>Secrétariat</b>
            </td>
            <td style={{ textAlign: "center" }} data-cy="fiche-manda-secretariat">
              {secretariat === true ? `Oui ${nb_secretariat && `(${nb_secretariat} ETP)`}` : "Non"}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default FicheMandataire;

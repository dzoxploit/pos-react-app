import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/resellerActions";

class CreateReseller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBarangResellerInputs: false,
      reseller_code: "",
      reseller_name: "",
      reseller_email: "",
      reseller_phone_number: "",
      reseller_description: "",
      category_reseller: "",
      reseller_expired: "",
      status: "",
      errors: {}
    };
    stsfx = [ "Baseball", "Basketball", "Cricket", "Field Hockey", "Football", "Table Tennis", "Tennis", "Volleyball" ];
    state = {
        allowCustom: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const barangData = {
      barang_code: this.state.barang_code,
      nama_barang: this.state.company,
      website: this.state.website,
      barang_slug: this.state.location,
      description: this.state.status,
      jumlah_barang_siap_jual: this.state.skills,
      jumlah_barang_reject: this.state.githubusername,
      status_fixed_harga: this.state.bio,
      harga_beli: this.state.twitter,
      harga_jual: this.state.facebook,
      linkedin: this.state.linkedin,
      discount_barang: this.state.youtube,
      harga_promo: this.state.instagram,
      batas_harga_promo : this.state.batas_harga_promo,
    };
    this.props.createBarang(barangData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const allowCustom = this.state.allowCustom;
    let barangInputs;

    if (displayBarangInputs) {
      barangInputs = (
        <div>
          <InputGroup
            placeholder="Slug barang"
            name="barang_slug"
            icon="fab fa-slug"
            value={this.state.barang_slug}
            onChange={this.onChange}
            error={errors.barang_slug}
          />
          <InputGroup
            placeholder="nama barang"
            name="nama_barang"
            value={this.state.nama_barang}
            onChange={this.onChange}
            error={errors.nama_barang}
          />
          <InputGroup
            placeholder="Description"
            name="description"
            icon="fab fa-text"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
          />
           <div>Status fixed harga:</div>
           <ComboBox data={this.stsfx} name="status_fixed_harga"
                    value={this.state.status_fixed_harga}
                    onChange={this.onChange}
                    error={errors.status_fixed_harga} 
                    allowCustom={allowCustom} />
          <InputGroup
            placeholder="Harga beli"
            name="harga_beli"
            icon="fab fa-money"
            value={this.state.harga_beli}
            onChange={this.onChange}
            error={errors.harga_beli}
          />
          <InputGroup
            placeholder="Harga jual"
            name="harga_jual"
            icon="fab fa-money"
            value={this.state.harga_jual}
            onChange={this.onChange}
            error={errors.harga_jual}
          />
          <InputGroup
            placeholder="Discount barang"
            name="discount_barang"
            icon="fab fa-money"
            value={this.state.discount_barang}
            onChange={this.onChange}
            error={errors.discount_barang}
          />
            <InputGroup
            placeholder="Harga Promo"
            name="harga_promo"
            icon="fab fa-money"
            value={this.state.harga_promo}
            onChange={this.onChange}
            error={errors.harga_promo}
          />
          <InputGroup
            placeholder="Batas Harga Promo"
            name="batas_harga_promo"
            icon="fab fa-money"
            value={this.state.batas_harga_promo}
            onChange={this.onChange}
            error={errors.batas_harga_promo}
          />
        </div>
      );
    }

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: " Developer", value: "Developer" },
      { label: " Junior Developer", value: "Junior Developer" },
      { label: " Senior Developer", value: "Senior Developer" },
      { label: " Manager", value: "Manager" },
      { label: " Student or Learning", value: "Student or Learning" },
      { label: " Intern", value: "Intern" },
      { label: " Instructor", value: "Instructor" },
      { label: " Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Barang</h1>
              <p className="lead text-center">
                Let's create information product
            </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Barang slug"
                  name="barang_slug"
                  value={this.state.barang_slug}
                  onChange={this.onChange}
                  error={errors.barang_slug}
                  info="A unique barang slug for your URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                />
                <TextFieldGroup
                  placeholder="* Nama barang"
                  name="nama_barang"
                  value={this.state.nama_barang}
                  onChange={this.onChange}
                  error={errors.nama_barang}
                  info="Nama Barang"
                />
                <TextFieldGroup
                  placeholder="* Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Nama Barang"
                />
                <SelectListGroup
                  placeholder="* Status fixed harga"
                  name="status_fixed_harga"
                  value={this.state.status_fixed_harga}
                  onChange={this.onChange}
                  error={errors.status_fixed_harga}
                  stsfx={stsfx}
                  info="Give Status Fixed harga for limit price promo"
                />
                <TextFieldGroup
                  placeholder="* harga_beli"
                  name="harga_beli"
                  value={this.state.harga_beli}
                  onChange={this.onChange}
                  error={errors.harga_beli}
                  info="Harga beli untuk membeli"
                />
                <TextFieldGroup
                  placeholder="* Harga jual"
                  name="harga_jual"
                  value={this.state.harga_jual}
                  onChange={this.onChange}
                  error={errors.harga_jual}
                  info="It can be your Harga Jual"
                />
                <TextFieldGroup
                  placeholder="* Harga promo"
                  name="harga_promo"
                  value={this.state.harga_promo}
                  onChange={this.onChange}
                  error={errors.harga_promo}
                  info="Harga Promo"
                />
                <TextFieldGroup
                  placeholder="* Batas Harga Promo"
                  name="batas_harga_promo"
                  value={this.state.batas_harga_promo}
                  onChange={this.onChange}
                  error={errors.batas_harga_promo}
                  info="Please Enter Batas Harga Promo"
                />
                <SelectListGroup
                  placeholder="* Location gudang"
                  name="location_gudang"
                  value={this.state.location_gudang}
                  onChange={this.onChange}
                  error={errors.location_gudang}
                  location_gudang={location_gudang}
                  info="Give Location gudang"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                  Create barangs
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateBatang.PropTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.barang,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createBarang }
)(withRouter(CreateBarang));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/barangActions";

class CreateBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barang_masuk_code: "",
      barang_code: "",
      distributor: "",
      status_barang_masuk: "",
      count_barang: "",
      errors: {}
    };
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

    const barangmasukData = {
      barang_code: this.state.barang_code,
      distributor: this.state.distributor,
      status_barang_masuk: this.state.status_barang_masuk,
    };
    this.props.createBarangMasuk(barangmasukData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    const allowCustom = this.state.allowCustom;
    let barangmasukInputs;

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
                Let's create information Barang Masuk
            </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
              <SelectListGroup
                  placeholder="Select barang"
                  name="barang_code"
                  value={this.state.barang_code}
                  onChange={this.onChange}
                  error={errors.barang_code}
                  barang_code={barang_code}
                  info="Give Status Fixed harga for limit price promo"
                />
                <SelectListGroup
                  placeholder="* Distributor"
                  name="distributor"
                  value={this.state.distributor}
                  onChange={this.onChange}
                  error={errors.distributor}
                  stsfx={stsfx}
                  info="Give Distributor"
                />
                <SelectListGroup
                  placeholder="* Status barang masuk"
                  name="status_barang_masuk"
                  value={this.state.status_barang_masuk}
                  onChange={this.onChange}
                  error={errors.status_barang_masuk}
                  status_barang_masuk={status_barang_masuk}
                  info="Give Status Barang Masuk"
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

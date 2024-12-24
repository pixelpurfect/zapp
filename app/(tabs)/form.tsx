import React from 'react';

const FormComponent: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid white',
    borderRadius: '8px',
    backgroundColor: '#333',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    margin: '10px 0 5px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid white',
    borderRadius: '4px',
    backgroundColor: 'black',
    color: 'white',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#ccc',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          User Registration
        </h1>
        <form>
          <label htmlFor="name" style={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            style={inputStyle}
            required
          />

          <label htmlFor="email" style={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            style={inputStyle}
            required
          />

          <label htmlFor="phone" style={labelStyle}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            style={inputStyle}
            required
          />

          <label htmlFor="regno" style={labelStyle}>
            Registration Number:
          </label>
          <input
            type="text"
            id="regno"
            name="regno"
            placeholder="Enter your registration number"
            style={inputStyle}
            required
          />

          <label htmlFor="department" style={labelStyle}>
            Department:
          </label>
          <input
            type="text"
            id="department"
            name="department"
            placeholder="Enter your department"
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#ccc')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = 'white')
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;

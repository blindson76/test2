import * as React from "react";
import { render } from "react-dom";
import Form from "react-jsonschema-form";
import * as themes from './fields';
import update from 'immutability-helper';
const fields={
  breadcrumb:props=>{
    return(
      <div>
        
      </div>
    )
  },
  string:themes.BasicInput
}
import "./styles.css";
let schema = {
  "type": "object",
  "properties": {
    "adi": {
      "type": "string",
      "description": "Adı",
      "maxLength": 100,
      "pattern": "\\w+"
    },
    "soyadi": {
      "type": "string",
      "description": "Soyadi"
    },
    "dogumYeri": {
      "type": "string",
      "description": "Doğum Yeri"
    },
    "dogumTarihi": {
      "type": "string",
      "description": "Doğum Tarihi",
      "format": "date"
    },
    "tcKimlikNo": {
      "type": "string",
      "description": "TC Kimlik No",
      "minLength": 11,
      "maxLength": 11,
      "pattern": "\\d{11}"
    },
    "cinsiyet": {
      "type": "string",
      "enum": [
        "ERKEK",
        "KADIN"
      ],
      "description": "Cinsiyet"
    },
    "medeniDurum": {
      "type": "string",
      "description": "Medeni Durum",
      "enum": [
        "EVLİ",
        "BEKAR",
        "DUL"
      ]
    },
    "SosyalGuvenlikKurulusu": {
      "type": "string",
      "description": "Sosyal Güvenlik Kuruluşu",
      "enum": [
        "SGK"
      ]
    }
  },
  "description": "Person",
  "required": [
    "adi",
    "soyadi",
    "dogumYeri",
    "dogumTarihi",
    "tcKimlikNo",
    "cinsiyet",
    "medeniDurum",
    "SosyalGuvenlikKurulusu"
  ]
}
let uiSchema = {
  content: [
    {
      type: 'breadcrumb',
      content: [
        {
          description: "yaşlı bilgileri",
          content: [
            'tcKimlikNo',
            [
              'adi', 'soyadi'
            ],
            [
              'dogumYeri', 'dogumTarihi'
            ],
            'cinsiyet'
          ]
        },
        {
          description:'diğer bilgiler',
          content:[
            'medeniHali'
          ]
        }
      ]
    },
    'tcKimlikNo',
    ['adi','soyadi']
  ]
}
class JSForm extends React.Component<any, any>{
  constructor(props: any) {
    super(props);

    this.state = {
      key1: "init",
      formData: {
        k1: "init",
        k2: 'init'
      }
    }

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);

    props = props || {
      content: []
    }
  }
  parseSchema(field,schema){
    console.log(typeof field)
    if(typeof field ==='string'){
      return "input:"+field;
    }

    if(Array.isArray(field)){
      return '<row/>'
    }
    
  }
  getProps(){
    
  }
  change(e) {
    let formData = update(this.state.formData, {
      k1: {
        $set: e
      }
    })
    this.setState({
      formData
    })
  }

  submit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          {this.props.uiSchema.content.map((k)=>this.parseSchema(k,this.props.schema))}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
function App() {
  return (
    <div className="App">
      <JSForm schema={schema} uiSchema={uiSchema}></JSForm>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

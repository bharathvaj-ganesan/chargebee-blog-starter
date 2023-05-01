import { getTextContent, getDateValue } from 'notion-utils';
import { NotionAPI } from 'notion-client';

async function getPageProperties(id, block, schema, authToken) {
  const api = new NotionAPI({ authToken });
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ['date', 'select', 'multi_select'];
  const properties = {};
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val);
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(val);
          delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(val);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(',');
          }
          break;
        }
        default:
          break;
      }
    }
  }
  return properties;
}

export { getPageProperties as default };

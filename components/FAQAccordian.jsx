import * as React from 'react';
import {vw, vh} from 'react-native-viewport-units';
import {List} from 'react-native-paper';

const FAQAccordian = ({data, expand}) => {
  const [expanded, setExpanded] = React.useState(expand);

  const {q, a} = data;

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="" style={{width: 90 * vw}}>
      <List.Accordion
        title={q}
        titleNumberOfLines={6}
        titleStyle={{fontSize: 5 * vw, color: '#000', fontWeight: '700'}}
        expanded={expanded}
        onPress={handlePress}
        left={props =>
          expanded ? (
            <List.Icon {...props} icon="minus" />
          ) : (
            <List.Icon {...props} icon="plus" />
          )
        }>
        <List.Item
          title={a}
          titleNumberOfLines={70}
          titleStyle={{
            width: '100%',
            fontSize: 4.5 * vw,
            lineHeight: 6 * vw,
            fontWeight: '600',
            color: '#000',
          }}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default FAQAccordian;

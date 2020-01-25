import { StyleSheet, Platform } from 'react-native';
import Colours from '../constants/darkTheme';

export const myStyles = StyleSheet.create({
    //inputs
    login:{
        borderBottomColor: Colours.accent,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        marginVertical:10,
        padding: 5,
        textAlign: "center",
        fontSize: 18,
        color: Colours.primaryText,
        minWidth:'45%',
    },
    input:{
        borderBottomColor: Colours.accent,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        padding: 5,
        textAlign: "center",
        fontSize: 18,
        color: Colours.primaryText,
        minWidth:60,
        maxWidth:120
    },
    inputVertical:{
        borderBottomColor: Colours.accent,
        borderBottomWidth: 1,
        padding: 5,
        textAlign: "center",
        fontSize: 17,
        color: Colours.primaryText,
        minWidth:60,
        maxWidth:120,
        marginBottom:40
    },
    //main list
    sortLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal:10,
        color: Colours.primaryText
    },
    topContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // marginTop: Platform.OS === 'ios' ? 15 : 35,
        marginBottom: 15,
    },
    activeFilterContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 15,
        marginHorizontal:15
    },
    //filter modal
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
    },
    verticalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '35%',
    },
    pickerWrapper: {
        height: 50,
        width: '40%',
        borderRadius: 5,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: Colours.primaryText,
        backgroundColor: Platform.OS === 'ios' ? Colours.transparent : Colours.white,
        marginBottom: Platform.OS === 'ios' ? 120 : 20,
        marginHorizontal: 10
    },
    columnPickerWrapper: {
        height: 50,
        width: '95%',
        borderRadius: 5,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: Colours.primaryText,
        backgroundColor: Platform.OS === 'ios' ? Colours.transparent : Colours.primaryText,
        marginBottom: Platform.OS === 'ios' ? 150 : 20,
        marginTop: Platform.OS === 'ios' ? -50 : 0,
        marginHorizontal: 10
    },
    pickerItem:{
        color: Colours.primaryText
    },
    //lists
    listItem: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginVertical: 1,
        minWidth: '95%',
        maxWidth:'99%',
        marginHorizontal:'1%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colours.accent,
    },
    listItemRow: {
        marginVertical: 3,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colours.backgroundLight,
        minWidth:'95%',
        justifyContent:'space-between',
        maxHeight:60
    },
    listItemColumn: {
        marginHorizontal:10
    },
    listItemValueLarge: {
        fontSize: 18,
        color: Colours.primaryText,
    },
    listItemValue: {
        fontSize: 15,
        color: Colours.primaryText,
        textAlign: 'left',

    },
    //modals
    modalContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
    },
    modalColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginHorizontal:20
    },
    modalRow: {
        paddingHorizontal: 25,
        margin: 0
    },
    modalDescription: {
        color: Colours.primaryText,
        fontSize: 17,
        textAlign: 'center'
    },
    modalDescriptionLarge: {
        color: Colours.primaryText,
        fontSize: 20,
        textAlign: 'center'
    }
  });
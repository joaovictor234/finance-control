import { useState, useEffect, useContext, createRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import ModalCustomization from "./ModalCustomization";

import { COLORS } from "../../constants/colors";
import { Category } from "../../models/Category";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";
import { MoneyContext } from "../../context/MoneyContext";
import { MoneyContextType } from "../../@types/MoneyContextType";
import CategoryOptions from "../Categories/Options";
import { formatToDecimalString } from "../../utils/formatToDecimalString";
import { formatToBRL } from "../../utils/formatToBRL";
import { formatToRawValue } from "../../utils/formatToRawValue";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface AddCategoriesItemProps {
  category: Category;
  idSelectedToEdit: string;
  onSelect: (id: string) => void;
}

const AddCategoriesItem = ({
  category,
  idSelectedToEdit,
  onSelect,
}: AddCategoriesItemProps) => {
  const { icons, colors, updateCategory, removeCategory } = useContext(
    CategoryContext
  ) as CategoryContextType;
  const { money } = useContext(MoneyContext) as MoneyContextType;
  const [editMode, setEditeMode] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [showIconsModal, setShowIconsModal] = useState(false);
  const [showColorsModal, setShowColorsModal] = useState(false);
  const [valueInputFocus, setValueInputFocus] = useState(false);
  const [percentageInputFocus, setPercentageInputFocus] = useState(false);

  const [editCategoryName, setEditCategoryName] = useState(category.name);
  const [categoryColor, setCategoryColor] = useState(category.color);
  const [categoryIcon, setCategoryIcon] = useState(category.icon);

  const inputRef = createRef<TextInput>();

  const [customizationValues, setCustomizationValues] = useState<{
    elements: string[];
    visible: boolean;
    selectedElement: string;
    customizationType: "color" | "icon";
  }>({
    elements: [],
    selectedElement: "",
    visible: false,
    customizationType: "color",
  });

  const openOptionsHandle = () => {
    if (category.id === idSelectedToEdit) onSelect("");
    else onSelect(category.id);
  };

  const updateCategoryHandle = () => {
    const updatedCategory: Category = {
      id: category.id,
      name: editCategoryName,
      color: categoryColor,
      icon: categoryIcon,
      percentage: category.percentage,
      totalRemaining: category.totalRemaining,
      totalValue: category.totalValue,
    };
    updateCategory(updatedCategory);
    setEditeMode(false);
  };

  const changeCategoryValue = (value: string) => {
    const categoryValue = formatToRawValue(value);
    const categoryPercentage = categoryValue / money;
    updateCategory({
      ...category,
      totalValue: categoryValue,
      totalRemaining: categoryValue,
      percentage: categoryPercentage,
    });
  };

  const changeCategoryPercentage = (value: string) => {
    const categoryPercentage = formatToRawValue(value) / 100;
    const categoryValue = categoryPercentage * money;
    updateCategory({
      ...category,
      totalValue: categoryValue,
      totalRemaining: categoryValue,
      percentage: categoryPercentage,
    });
  };

  const editCategoryHandle = (value: string) => {
    setEditCategoryName(value);
  };

  const selectCategoryCustomizarionHandle = (
    customizationType: "color" | "icon",
    element: string
  ) => {
    if (customizationType === "color") {
      setCategoryColor(element);
      setShowColorsModal(false);
    } else {
      setCategoryIcon(element);
      setShowIconsModal(false);
    }
    setCustomizationValues({
      customizationType: "color",
      elements: [],
      selectedElement: "",
      visible: false,
    });
    updateCategoryHandle();
  };

  const removeCategoryHandle = () => {
    removeCategory(category.id);
  };

  const closeModalHandle = () => {
    setCustomizationValues({
      customizationType: "color",
      elements: [],
      selectedElement: "",
      visible: false,
    });
    setShowColorsModal(false);
    setShowIconsModal(false);
  };

  useEffect(() => {
    if (idSelectedToEdit === category.id) setOpenOptions(true);
    else setOpenOptions(false);
  }, [idSelectedToEdit]);

  useEffect(() => {
    if (inputRef.current && editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    if (showColorsModal) {
      const elements = [...colors];
      if (!colors.includes(categoryColor)) elements.push(categoryColor);
      setCustomizationValues({
        elements: elements,
        selectedElement: categoryColor,
        visible: showColorsModal,
        customizationType: "color",
      });
    } else {
      const elements = [...icons];
      if (!icons.includes(categoryIcon)) elements.push(categoryIcon);
      setCustomizationValues({
        elements: elements,
        selectedElement: categoryIcon,
        visible: showIconsModal,
        customizationType: "icon",
      });
    }
  }, [showColorsModal, showIconsModal]);

  return (
    <View>
      <View style={[styles.item, { borderLeftColor: categoryColor }]}>
        <View style={styles.customization}>
          <Pressable
            style={styles.customizationButton}
            onPress={() => setShowIconsModal(true)}
          >
            <Ionicons
              name={categoryIcon}
              size={24}
              style={{ color: categoryColor }}
            />
            <Ionicons name="chevron-down" size={16} />
          </Pressable>
          <Pressable
            style={styles.customizationButton}
            onPress={() => setShowColorsModal(true)}
          >
            <View style={[styles.color, { backgroundColor: categoryColor }]} />
            <Ionicons name="chevron-down" size={16} />
          </Pressable>
        </View>
        <View style={styles.categoryNameInput}>
          <Pressable style={styles.category} onPress={openOptionsHandle}>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editCategoryName}
                onChangeText={editCategoryHandle}
                onBlur={updateCategoryHandle}
                ref={inputRef}
              />
            ) : (
              <Text style={[styles.categoryName, { color: categoryColor }]}>
                {category.name}
              </Text>
            )}
            <MaterialIcons
              name={`keyboard-arrow-${openOptions ? "up" : "down"}`}
              size={24}
              color="black"
            />
          </Pressable>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 6 }}>
              <Text>Valor</Text>
              <TextInput
                value={formatToBRL(category.totalValue)}
                keyboardType="number-pad"
                onChangeText={changeCategoryValue}
                onFocus={() => setValueInputFocus(true)}
                onBlur={() => setValueInputFocus(false)}
                style={[
                  styles.input,
                  styles.inputValue,
                  valueInputFocus && styles.focus,
                ]}
              />
            </View>
            <View style={{ flex: 3 }}>
              <Text>Porcentagem</Text>
              <TextInput
                keyboardType="number-pad"
                value={formatToDecimalString(category.percentage * 100)}
                style={[styles.input, percentageInputFocus && styles.focus]}
                onChangeText={changeCategoryPercentage}
                onFocus={() => setPercentageInputFocus(true)}
                onBlur={() => setPercentageInputFocus(false)}
              />
            </View>
          </View>
        </View>
      </View>
      {openOptions && (
        <CategoryOptions
          editMode={editMode}
          setEditMode={setEditeMode}
          onRemoveCategory={removeCategoryHandle}
          onUpdateCategory={updateCategoryHandle}
        />
      )}
      <ModalCustomization
        elements={customizationValues.elements}
        visible={customizationValues.visible}
        selectedElement={customizationValues.selectedElement}
        onRequestClose={closeModalHandle}
        customizationType={customizationValues.customizationType}
        onSelectElement={selectCategoryCustomizarionHandle}
      />
    </View>
  );
};

export default AddCategoriesItem;

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    borderLeftWidth: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary50,
  },
  customization: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  customizationButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  color: {
    height: 20,
    width: 20,
    borderColor: COLORS.borderColor,
    borderWidth: 4,
  },
  categoryNameInput: {
    flex: 6,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: 100,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  inputValue: {
    width: 180,
    marginRight: 10,
  },
  focus: {
    borderColor: COLORS.primary50,
  },
  editButton: {
    flex: 1,
  },
});

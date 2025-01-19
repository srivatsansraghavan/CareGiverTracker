import mainstyle from "./Main.module.css";

function Main() {
  return (
    <div className={mainstyle.mainContainer}>
      <article>
        <section className={mainstyle.mainDescription}>
          <p>
            Caregiver tracker is used to manage care given to those who need it.
            Be it an infant or child or spouse or parent or friend, there arises
            a situation where they need to be taken care of in a regular manner.
            This caregiver tracker takes care of such needs.
          </p>
        </section>
        <section className={mainstyle.feedingTracker}>
          <p>
            Feeding tracker can be used to track different types of feeds. We
            can choose feeding types such as Breast feeding, Breast pumping,
            Formula feeding, Mashed food, Normal food, Water, Juices, etc.
            Feeding modes include Manual or Electric pump for Breast pumping,
            Feeding bottle, Spoon, Glass, etc. Feeding side would be visible for
            breast pumping and breast feeding. Tracking can be started and
            stopped. Upon finishing a tracking, feed quantity can be recorded.
            Feeds are listed under the Feeding tracker tab. Feeds can be edited
            and deleted. Feeds are listed datewise. Pumped feeds when fed are
            indented to show that.
          </p>
        </section>
        <section className={mainstyle.excretionTracker}>
          <p>
            Excretion tracker can be used to track urine, stools and both. Users
            are given the option to choose Diaper or other methods like cloth.
            Diaper field is populated when diapers are added to the inventory
            under inventory tracker. If Diaper is not listed under Inventory
            tracker, then it will not allow to add Excretion.
          </p>
        </section>
        <section className={mainstyle.medicationTracker}>
          <p>
            Medication tracker can be used to track medicines provided. Users
            are given the option to choose medicine in the form of drops, syrup,
            pills or tablets. Medicine field is populated when medicines are
            added to the inventory under inventory tracker. If medicine is not
            listed under Inventory tracker, then it will not allow to add
            Medication.
          </p>
        </section>
        <section className={mainstyle.inventoryTracker}>
          <p>Inventory</p>
        </section>
      </article>
    </div>
  );
}

export default Main;

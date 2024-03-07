import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import AddPatientEntryModal from "../AddPatientEntryForm";
import EntryDetails from "../EntriesDetails";

import patients from "../../services/patients";

import { Entry, PatientEntryFormValues } from "../../types";

const Entries = ({ id, entries }: { id: string, entries: Entry[] }) => {
  const [patientEntries, setPatientEntries] = useState<Entry[]>(entries);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
    try {
      const patientEntry = await patients.createEntry(id, values);
      if (patientEntry) {
        setPatientEntries(patientEntries.concat(patientEntry));
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <section>
      <div style={{marginBottom: "20px"}}>
        <AddPatientEntryModal modalOpen={modalOpen} onSubmit={submitNewPatientEntry} error={error} onClose={closeModal} />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
      <div>
        {patientEntries.map((entry, i) => <EntryDetails entry={entry} key={i} />
        )}
      </div>
    </section>
  );
};

export default Entries;
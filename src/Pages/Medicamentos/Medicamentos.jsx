import { useEffect, useRef, useState } from "react";
import styles from "./Medicamentos.module.css";

export default function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState(() => {
    return JSON.parse(localStorage.getItem("meds")) || [];
  });

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [form, setForm] = useState({
    nome: "",
    dias: "",
    horario: "",
    finalidade: "",
  });

  const [toast, setToast] = useState({
    mostrar: false,
    mensagem: "",
    tipo: "sucesso",
  });

  const nomeRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("meds", JSON.stringify(medicamentos));
  }, [medicamentos]);

  const abrirForm = () => {
    setMostrarForm(true);

    setTimeout(() => {
      nomeRef.current?.focus();
    }, 100);
  };

  const limpar = () => {
    setForm({
      nome: "",
      dias: "",
      horario: "",
      finalidade: "",
    });
  };

  const fecharForm = () => {
    setMostrarForm(false);
    limpar();
    setEditIndex(-1);
  };

  const mostrarToast = (mensagem, tipo = "sucesso") => {
    setToast({
      mostrar: true,
      mensagem,
      tipo,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        mostrar: false,
      }));
    }, 2500);
  };

  const salvar = () => {
    if (
      !form.nome ||
      !form.dias ||
      !form.horario ||
      !form.finalidade
    ) {
      mostrarToast("Preencha todos os campos", "erro");
      return;
    }

    const med = { ...form };

    if (editIndex === -1) {
      setMedicamentos((prev) => [...prev, med]);
      mostrarToast(
        "Medicamento salvo com sucesso",
        "sucesso"
      );
    } else {
      const atualizados = [...medicamentos];
      atualizados[editIndex] = med;

      setMedicamentos(atualizados);

      mostrarToast(
        "Medicamento atualizado",
        "aviso"
      );
    }

    fecharForm();
  };

  const editar = (i) => {
    const med = medicamentos[i];

    setForm(med);
    setEditIndex(i);

    abrirForm();

    mostrarToast(
      "Editando medicamento",
      "aviso"
    );
  };

  const excluirMed = (i) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir este medicamento?"
    );

    if (!confirmar) return;

    const lista = [...medicamentos];
    lista.splice(i, 1);

    setMedicamentos(lista);

    mostrarToast(
      "Medicamento excluído",
      "aviso"
    );
  };

  const handleEnter = (e, proximoId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (proximoId) {
        document.getElementById(proximoId)?.focus();
      } else {
        salvar();
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciamento de Medicamentos</h1>

      <p className={styles.sub}>
        Controle seus medicamentos de forma prática e segura
      </p>

      <button
        className={styles.botaoAdicionar}
        onClick={abrirForm}
      >
        + Adicionar medicamento
      </button>

      {toast.mostrar && (
        <div
          className={`${styles.toast}
          ${
            toast.tipo === "sucesso"
              ? styles.toastSucesso
              : toast.tipo === "erro"
              ? styles.toastErro
              : styles.toastAviso
          }`}
        >
          {toast.mensagem}
        </div>
      )}

      {mostrarForm && (
        <div className={styles.formBox}>
          <h2 className={styles.formTitulo}>
            {editIndex === -1
              ? "Novo medicamento"
              : "Editar medicamento"}
          </h2>

          <div className={styles.inputGroup}>
            <label>Nome do medicamento</label>

            <input
              ref={nomeRef}
              id="nome"
              value={form.nome}
              placeholder="Ex: Paracetamol"
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value,
                })
              }
              onKeyDown={(e) =>
                handleEnter(e, "dias")
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Dias de uso</label>

            <input
              id="dias"
              value={form.dias}
              placeholder="Ex: Seg, Qua, Sex"
              onChange={(e) =>
                setForm({
                  ...form,
                  dias: e.target.value,
                })
              }
              onKeyDown={(e) =>
                handleEnter(e, "horario")
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Horário</label>

            <input
              id="horario"
              type="time"
              value={form.horario}
              onChange={(e) =>
                setForm({
                  ...form,
                  horario: e.target.value,
                })
              }
              onKeyDown={(e) =>
                handleEnter(e, "finalidade")
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Finalidade</label>

            <input
              id="finalidade"
              value={form.finalidade}
              placeholder="Ex: Dor / Febre"
              onChange={(e) =>
                setForm({
                  ...form,
                  finalidade: e.target.value,
                })
              }
              onKeyDown={(e) =>
                handleEnter(e)
              }
            />
          </div>

          <div className={styles.botoes}>
            <button
              className={styles.salvar}
              onClick={salvar}
            >
              Salvar
            </button>

            <button
              className={styles.cancelar}
              onClick={fecharForm}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Dias</th>
            <th>Horário</th>
            <th>Finalidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {medicamentos.map((m, i) => (
            <tr key={i}>
              <td>{m.nome}</td>

              <td>{m.dias}</td>

              <td>{m.horario}</td>

              <td>
                <span
                  className={styles.finalidadeTag}
                >
                  {m.finalidade}
                </span>
              </td>

              <td>
                <button
                  className={styles.editar}
                  onClick={() => editar(i)}
                >
                  Editar
                </button>

                <button
                  className={styles.excluir}
                  onClick={() =>
                    excluirMed(i)
                  }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export {Medicamentos};
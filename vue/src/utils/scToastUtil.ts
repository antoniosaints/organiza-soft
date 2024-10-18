import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";
import { h } from "vue";
const { toast } = useToast();

export class ScToastUtil {
  static error = (message: string) => {
    toast({
      title: "Erro!",
      action: h(
        ToastAction,
        {
          altText: "Fechar",
        },
        {
          default: () => "Fechar",
        }
      ),
      class:
        "border-none dark:bg-red-900 max-w-md left-2 bottom-2 fixed md:top-2 md:left-auto md:bottom-auto md:right-2 dark:text-red-100 text-red-900 bg-red-100 transition duration-75",
      description: message,
      duration: 3000,
    });
  };
  static info = (message: string) => {
    toast({
      title: "Informação!",
      action: h(
        ToastAction,
        {
          altText: "Fechar",
        },
        {
          default: () => "Fechar",
        }
      ),
      class:
        "border-none dark:bg-cyan-900 max-w-md left-2 bottom-2 fixed md:top-2 md:left-auto md:bottom-auto md:right-2 dark:text-cyan-100 text-cyan-900 bg-cyan-100 transition duration-75",
      description: message,
      duration: 3000,
    });
  };
  static warning = (message: string) => {
    toast({
      title: "Atenção!",
      action: h(
        ToastAction,
        {
          altText: "Fechar",
        },
        {
          default: () => "Fechar",
        }
      ),
      class:
        "dark:bg-yellow-900 max-w-md left-2 bottom-2 fixed md:top-2 md:left-auto md:bottom-auto md:right-2 dark:text-yellow-100 text-yellow-900 bg-yellow-100 transition duration-75",
      description: message,
      duration: 3000,
    });
  };
  static success = (message: string) => {
    toast({
      title: "Sucesso!",
      action: h(
        ToastAction,
        {
          altText: "Ok!",
        },
        {
          default: () => "Ok!",
        }
      ),
      class:
        "border-none dark:bg-green-900 max-w-md left-2 bottom-2 fixed md:top-2 md:left-auto md:bottom-auto md:right-2 dark:text-green-100 text-green-900 bg-green-100 transition duration-75",
      description: message,
      duration: 3000,
    });
  };
}
